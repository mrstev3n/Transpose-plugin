   

    const selection = getFilteredSelection()
    
    let mylength = selection.length;
    let defaults = ['Each one', 'Grouped'];
	
    figma.parameters.on("input", ({ query, result }: ParameterInputEvent) => {

    // Check if something is selected

      if (selection.length === 0) {
        result.setError("⚠️ Please select at least one layer beforehand")
        return
    }

    // Display default options
    // filter to allow only values matching the typed value

    else {

      result.setSuggestions(defaults.filter((s) => s.includes(query))); 

    }
			
});

// Start the 'run' event after user input.

figma.on("run", ({ parameters }: RunEvent) => {
  const closeMessage = startPluginWithParameters(parameters)
  figma.closePlugin(closeMessage)
})

function startPluginWithParameters(parameters: ParameterValues): string {
  const selection = getFilteredSelection()

  if (selection.length === 0) {
      figma.notify("⚠️ Please select at least one layer beforehand.", {
          error: true,
      })
      return ""
  }

  const type = parameters["type"]

  switch (type) {
		case 'Each one':
			
      for(let i = 0; i < mylength; i++) {

        let width = selection[i].width;
        let height = selection[i].height;
        let nodes = [];

            // Flip each selected layers W & H
  
            // @ts-expect-error
            if (height < 0.01 && width >= 0.01) { nodes.push(selection[i].resize(0.01, width))} else
  
            // @ts-expect-error
            if (height >= 0.01 && width < 0.01) { nodes.push(selection[i].resize(height, 0.01))} 
  
            // @ts-expect-error
            else { nodes.push(selection[i].resize(height, width))}

        }
  
			break;

		case 'Grouped':

          // Group & Flip selected layers W & H        

			break;
		default:
			return;
	}


  if (selection.length === 1) {
      return "1 layer resized"
  } else {
      return `${selection.length} layers resized`
  }


}


    function getFilteredSelection() {
      return figma.currentPage.selection.filter(
          (node) =>
              (node.type === "FRAME" ||
                node.type === "RECTANGLE" ||
                node.type === "ELLIPSE" ||
                node.type === "POLYGON" ||
                node.type === "TEXT" ||
                node.type === "SHAPE_WITH_TEXT" ||
                node.type === "COMPONENT" ||
                node.type === "GROUP")
      )
  }