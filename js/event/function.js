const delParent = target => target.parentNode.remove();


const openListing = target => {   

    // target fontAwesome Icon
    const targetParent  = target.parentNode //label.inputTrigger
    const targetinput = target.previousElementSibling //input 

    const depth         = targetinput.dataset.depth;    
    const context       = targetinput.dataset.context;
    const fields        = targetinput.dataset.fields;
    const targetLabel  = document.querySelector(`#inputTrigger--${context}`)
    let thisListing = []


    // On Pécupère tout le label (Un seul ouvert à la fois) possédant la classe open et on ferme

    closeListing(targetLabel)

    console.log(depth);


        switch(depth){

            case 'lowerLevel':

                //A découper injectListing
                    thisListing = makeComponent(
                      new listing(
                        getData.allDataLowerLevel(context, fields),
                        context
                      )
                    );
                    renderComponent(thisListing,targetLabel)
                    new EventsDispatcher('[data-js="getTag"]');
                //

                targetinput.setAttribute('placeholder','Rechercher un ingredient')               
                targetParent.setAttribute('data-status','openList')


            break;

            case 'root':


                    thisListing = makeComponent(
                      new listing(getData.allDataRoot(context), context)
                    );
                renderComponent(thisListing,targetLabel)
                targetinput.setAttribute('placeholder','Rechercher un ingredient')
                targetParent.setAttribute('data-status','openList')

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

        const childOfOpen = thisOpen.firstChild.nextSibling //#text->input  Write function getFirstChild ???
        const placeHolder = childOfOpen.dataset.placeholder
        childOfOpen.setAttribute('placeHolder',placeHolder)      
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


//Reset de toutes les listes au click dans le dom


window.addEventListener('click', (e) => { 
  
    resetInput();

});