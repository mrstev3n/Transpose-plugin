    const nodes = [];
    const form = figma.currentPage.selection[0];

    let { selection } = figma.currentPage;

    function SelectionSize() {

    const width = form.width;
    const height = form.height;
    form.resize(height, width);

    }

    // Flip W & H

    if (!(selection.length > 0)) {

        figma.closePlugin('Please select at least one node');

      } 
      
      else {

        nodes.push(SelectionSize());

        

        /*
            const width = form.width;
            const height = form.height;
            form.resize(height, width);     
        */

      }
    
    figma.closePlugin();


