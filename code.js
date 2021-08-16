    const nodes = [];
    const form = figma.currentPage.selection[0];

    let { selection } = figma.currentPage;

    function SelectionSize() {

    const width = form.width;
    const height = form.height;
    form.resize(height, width);

    }

    if (!(selection.length > 0)) {

        // figma.notify('Please select at least one node');

        figma.closePlugin('Please select at least one node');

      } 
      
      else {

        nodes.push(SelectionSize());

        // Flip W & H

        /*
            const width = form.width;
            const height = form.height;
            form.resize(height, width);     
        */

      }
    
    figma.closePlugin();


