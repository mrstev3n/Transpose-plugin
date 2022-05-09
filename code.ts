    const selection = getFilteredSelection()
    
    let mylength = selection.length;

  if (selection.length === 0) {
      figma.notify("⚠️ Please select at least one layer beforehand.", {
          error: true,
      })
      figma.closePlugin();
  }

  if (selection.length > 0) {

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

   if (selection.length === 1) {

    figma.closePlugin('1 layer resized');

    } else {
    
      figma.closePlugin(`${selection.length} layers resized`)
     
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