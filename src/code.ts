const TYPE_OPTIONS = ["Each one", "Grouped"] as const
const DIRECTION_OPTIONS = ["Vertical", "Horizontal"] as const

type TransposeType = (typeof TYPE_OPTIONS)[number]
type TransposeDirection = (typeof DIRECTION_OPTIONS)[number]
type SupportedNode = SceneNode & LayoutMixin

type NodeSnapshot = {
  node: SupportedNode
  x: number
  y: number
  width: number
  height: number
}

figma.parameters.on("input", ({ key, query, result }: ParameterInputEvent) => {
  const selection = getFilteredSelection()

  if (selection.length === 0) {
    result.setError("⚠️ Please select at least one supported layer beforehand")
    return
  }

  const options =
    key === "direction" ? [...DIRECTION_OPTIONS] : [...TYPE_OPTIONS]

  result.setSuggestions(filterSuggestions(options, query))
})

figma.on("run", ({ parameters }: RunEvent) => {
  const closeMessage = startPluginWithParameters(parameters || {})
  figma.closePlugin(closeMessage)
})

function startPluginWithParameters(parameters: ParameterValues): string {
  const selection = getFilteredSelection()

  if (selection.length === 0) {
    figma.notify("⚠️ Please select at least one supported layer beforehand.", {
      error: true,
    })
    return ""
  }

  const type = parseType(parameters.type)
  const direction = parseDirection(parameters.direction)

  if (type === "Grouped" && selection.length > 1) {
    transposeGrouped(selection, direction)
  } else {
    transposeEachOne(selection)

    if (type === "Grouped" && selection.length === 1) {
      figma.notify("Grouped needs at least 2 layers. Transposed the single layer instead.")
    }
  }

  return buildCloseMessage(selection.length, type, direction)
}

function transposeEachOne(selection: SupportedNode[]): void {
  for (const node of selection) {
    transposeNode(node)
  }
}

function transposeGrouped(
  selection: SupportedNode[],
  direction: TransposeDirection
): void {
  const orderedSnapshots = getOrderedSnapshots(selection, direction)
  const gaps = getSequentialGaps(orderedSnapshots, direction)

  for (const snapshot of orderedSnapshots) {
    transposeNode(snapshot.node)
  }

  if (direction === "Vertical") {
    const anchorX = orderedSnapshots[0].x
    let cursorY = orderedSnapshots[0].y

    orderedSnapshots.forEach((snapshot, index) => {
      const node = snapshot.node
      node.x = anchorX
      node.y = cursorY

      if (index < orderedSnapshots.length - 1) {
        cursorY += node.height + gaps[index]
      }
    })

    return
  }

  const anchorY = orderedSnapshots[0].y
  let cursorX = orderedSnapshots[0].x

  orderedSnapshots.forEach((snapshot, index) => {
    const node = snapshot.node
    node.x = cursorX
    node.y = anchorY

    if (index < orderedSnapshots.length - 1) {
      cursorX += node.width + gaps[index]
    }
  })
}

function transposeNode(node: SupportedNode): void {
  const centerX = node.x + node.width / 2
  const centerY = node.y + node.height / 2
  const nextWidth = clampSize(node.height)
  const nextHeight = clampSize(node.width)

  node.resize(nextWidth, nextHeight)
  node.x = centerX - nextWidth / 2
  node.y = centerY - nextHeight / 2
}

function getOrderedSnapshots(
  selection: SupportedNode[],
  direction: TransposeDirection
): NodeSnapshot[] {
  return selection
    .map((node) => ({
      node,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
    }))
    .sort((a, b) => {
      if (direction === "Vertical") {
        return a.y - b.y || a.x - b.x
      }

      return a.x - b.x || a.y - b.y
    })
}

function getSequentialGaps(
  snapshots: NodeSnapshot[],
  direction: TransposeDirection
): number[] {
  const gaps: number[] = []

  for (let index = 1; index < snapshots.length; index++) {
    const previous = snapshots[index - 1]
    const current = snapshots[index]

    if (direction === "Vertical") {
      gaps.push(Math.max(0, current.y - (previous.y + previous.height)))
    } else {
      gaps.push(Math.max(0, current.x - (previous.x + previous.width)))
    }
  }

  return gaps
}

function getFilteredSelection(): SupportedNode[] {
  return figma.currentPage.selection.filter(isSupportedNode)
}

function isSupportedNode(node: SceneNode): node is SupportedNode {
  if (node.locked || !("resize" in node)) {
    return false
  }

  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "RECTANGLE" ||
    node.type === "ELLIPSE" ||
    node.type === "POLYGON" ||
    node.type === "TEXT" ||
    node.type === "SHAPE_WITH_TEXT" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "LINE"
  )
}

function filterSuggestions(options: string[], query: string): string[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return options
  }

  return options.filter((option) =>
    option.toLowerCase().includes(normalizedQuery)
  )
}

function parseType(value: unknown): TransposeType {
  return value === "Grouped" ? "Grouped" : "Each one"
}

function parseDirection(value: unknown): TransposeDirection {
  return value === "Horizontal" ? "Horizontal" : "Vertical"
}

function clampSize(value: number): number {
  return Math.max(0.01, value)
}

function buildCloseMessage(
  count: number,
  type: TransposeType,
  direction: TransposeDirection
): string {
  const layerLabel = count === 1 ? "layer" : "layers"

  if (type === "Each one") {
    return `${count} ${layerLabel} transposed individually`
  }

  return `${count} ${layerLabel} transposed as a ${direction.toLowerCase()} group`
}
