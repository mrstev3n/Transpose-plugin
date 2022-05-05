    // Get selection on current page
    // Check if something is selected

    let { selection } = figma.currentPage;
    
    let mylength = selection.length;

    if (!(mylength > 0)) {

      figma.closePlugin('Please select ato least one node');

    } else {

      
      for(let i = 0; i < mylength; i++) {

      let width = selection[i].width;
      let height = selection[i].height;
      let nodes = [];

        // @ts-expect-error
        if (!(selection[i].type === 'PAGE')) {

          // Flip W & H

          // @ts-expect-error
          if (height < 0.01 && width >= 0.01) { nodes.push(selection[i].resize(0.01, width))} else

          // @ts-expect-error
          if (height >= 0.01 && width < 0.01) { nodes.push(selection[i].resize(height, 0.01))} 

          // @ts-expect-error
          else { nodes.push(selection[i].resize(height, width))}

        }

        figma.closePlugin('Transposition Done');

    }

    }
 

   