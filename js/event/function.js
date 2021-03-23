const delParent = target => target.parentNode.remove();

const openListing = target => {

  // target is fontAwesome Icon
  const targetParent = target.parentNode; //label.inputTrigger
  const targetInput = target.previousElementSibling; //input
  //Data attributes fusionnée entre ceux présent dans l'Input et l'icone cliqué
  const options = targetInput.dataset;
  const targetLabel = document.querySelector(`#inputTrigger--${options.context}`);
  let thisListing = [];

  console.log(options);

  // On Récupère tout le label (Un seul ouvert à la fois) possédant la classe open et on ferme
  //Conditionné si un listing est ouvert
  closeListing(targetLabel);

  switch (options.depth) {

    case "lowerLevel":
      //A découper injectListing
      thisListing = makeComponent( new listing( getData.allDataLowerLevel(options), options));
      renderComponent(thisListing, targetLabel);
      new EventsDispatcher('[data-js="getTag"]');
      //
      targetInput.setAttribute("placeholder", `Rechercher un ${options.context}`);
      targetParent.setAttribute("data-status", "openList");

      break;

    case "root":
      thisListing = makeComponent( new listing(getData.allDataRoot(options), options));
      renderComponent(thisListing, targetLabel);
      new EventsDispatcher('[data-js="getTag"]');
      targetInput.setAttribute("placeholder", `Rechercher un ${options.context}`);
      targetParent.setAttribute("data-status", "openList");

      break;
  }
}

const closeListing = (exclude) => {

    const thisOpen = document.querySelector('[data-status="openList"]')
    const elRemove = document.querySelector('.inputList')

       if (document.querySelectorAll(".inputList").length > 0) {
         document.querySelector(".inputList").remove();
         resetOtherInput(exclude)

       }

    if(thisOpen){    
        if(elRemove){
            elRemove.remove()
        }

        const childOfOpen = thisOpen.firstElementChild //#text->input 
        const options = childOfOpen.dataset //#text->input 
        childOfOpen.setAttribute('placeHolder',options.placeHolder)      
        thisOpen.setAttribute('data-status','close')

    }

}

const resetAllInput = ()=>{
      const allList = document.querySelectorAll(".inputTrigger");

      allList.forEach((thisOpen) => {
        const childOfOpen = thisOpen.firstElementChild; //#text->input  Write function getFirstChild ???
        const placeHolder = childOfOpen.dataset.placeholder;

        childOfOpen.value = "";
        childOfOpen.setAttribute("placeHolder", placeHolder);
        thisOpen.setAttribute("data-status", "close");
      });
}

const resetOtherInput = (exclude)=>{
      const allList = document.querySelectorAll(".inputTrigger");

      allList.forEach((thisOpen) => {
        if(thisOpen !== exclude){
        const childOfOpen = thisOpen.firstElementChild; //#text->input  Write function getFirstChild ???
        const placeHolder = childOfOpen.dataset.placeholder;

        childOfOpen.value = "";
        childOfOpen.setAttribute("placeHolder", placeHolder);
        thisOpen.setAttribute("data-status", "close");
        }
      });
}


const getResultToRootAndLowerLevel = (options) => {

  result = []
     switch (options.depth) {
        case "lowerLevel":
          result = getData.specificDataLowerLevel(options);
          break;
        case "root":
          result = getData.specificDataRoot(options);
          break;
      }
  return result;

}


const showErroMessage = (message) =>{

}

//Reset de toutes les listes au click dans le dom
window.addEventListener('click', (e) => { 
  
    resetAllInput();

});