class SearchData {

  getSuggestion(target) {
    let result = [];
    let tmp = [];

    const search = target.value;
    const context = target.dataset.context;
    const fields = target.dataset.fields;
    const depth = target.dataset.depth;

    const targetLabel = document.querySelector(`#inputTrigger--${context}`);

    switch (depth) {

      case "lowerLevel": tmp = getData.specificDataLowerLevel(search, fields, context);  break;
      case "root":       tmp = getData.specificDataRoot(search, fields);  break;

    }

    tmp.forEach((el) => {
      if (!result.includes(el.value)) { result.push(el.value); }
    });

    const allList = document.querySelectorAll(".inputList");

    if (allList.length > 0) {
        document.querySelector(".inputList").remove()
        resetOtherInput(targetLabel)
    }

    if(targetLabel.getAttribute("data-status") === 'openList' && result.length>0){
        targetLabel.setAttribute("data-status", "openSuggestion");
    }
  
    const thisListing = makeComponent(new listing(result, context));
    renderComponent(thisListing, targetLabel);
    targetLabel.setAttribute("data-status", "openSuggestion");

  }

  getTag(target){

    const label = target.closest(".inputTrigger");
    const input = label.firstElementChild
    
    
    const search  = target.textContent;
    const context = input.dataset.context
    const fields  = input.dataset.fields
    const depth   = input.dataset.depth
    const multiSearch = []



    switch(depth){
        case 'lowerLevel' 

        //On list les tag Existants

        //On push

        //On boucle sur multiSearch et obtient les ID
        //On obtient les recettes
        //On affiche les recettes
        //On affiche le tag
        
        
        
        : break
        case 'root'
        
        
        : break
    }
        


  }




}
