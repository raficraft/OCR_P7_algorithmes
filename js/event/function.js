
const delRecipes = ()=>{

  //console.error('reset des recettes');
  
  if (document.querySelectorAll(".sticker").length > 0) {
      let removethis = document.querySelectorAll(".sticker");
      removethis.forEach((el) => {
          el.remove();
      });
  } 
}

const showRecipesByID = (recipes) => {

  //console.error(recipes.length);
  showMessage('info',`${recipes.length} résultats trouvés`) 
  const recipesComponent = makeComponent(new createRecipe(recipes));  
  const targetRenderRecipes = document.querySelector("#main");  
  renderComponent(recipesComponent, targetRenderRecipes);
}

const showValidTags = tagsValid =>{

  const showTarget = document.querySelector("#filterResult");     
  const thisTags = makeComponent(new createTags(tagsValid.dataset));
  renderComponent(thisTags, showTarget); 



}

const delTags = target => {

  target.remove()
  //console.log('del');

}

const  majListing = (recipesByID) =>{

  

      init.options.forEach((req) => {
       
        let newListing = [];
         switch (req.depth) {
           case "lowerLevel":            

               recipesByID.forEach((recipe) => {
                 const thisArray = recipe[req.context];

                 thisArray.filter((el) => {
                  if (req.fields !== req.context) {  el = el[req.fields];  }               

                      if (!newListing.includes(el)) { newListing.push(el); }                 

                 });
               });
              
                //On réinitilise le clique dans le nouveau listing
                //console.log(newListing);
                showNewListing(req,newListing)

            break;


            case "root":

              recipesByID.forEach((recipe) => {  
                if(!newListing.includes(recipe[req.context])){                  
                  newListing.push(recipe[req.context])
                }
              }) 

              showNewListing(req,newListing)

            break;
         }
       });


       //On supprime les tags dans les list
}

const showNewListing = (req,newListing) => {

  //console.log(req.context);  
  //console.log(newListing);

  let targetLabel = document.querySelector(`#inputTrigger--${req.context}`);
  thisListing = makeComponent(new createListing(newListing, req));
  const rootElement = document.querySelector(`#inputTrigger--${req.context} ul`)
  if(rootElement){
  document.querySelector(`#inputTrigger--${req.context} ul`).remove()
  }
  renderComponent(thisListing, targetLabel);

}

const removeTagInListing = (value) => {  

    value = normalizeString(value)

    if(document.querySelector(`li[data-value="${value}"]`)){
      const removeThis = document.querySelector(`li[data-value="${value}"]`)
      removeThis.remove()
    }

}

//Message

const showMessage = (type,message)=>{

  const messageComponent = makeComponent(new CreateAlertMessage(type,message));
  const targetRenderMessage = document.querySelector('body');
  renderComponent(messageComponent, targetRenderMessage);
  setTimeout(function(){ document.querySelector('.alertMessage').remove() }, 4000);

}

const removeAllTags = () => {

  const allTags = document.querySelectorAll('.filterTag')

  if(allTags.length > 0){
    allTags.forEach(tag => {  tag.remove() });
    window.listingEvent.resetInput()
  }

}

const closeListing = () => {

  //console.log('on ferme');
  const thisOpen = document.querySelector('[data-status="openList"]')
      
  if (document.querySelectorAll(".inputList").length > 0) {         
  this.resetInput()
  //init.renderListing()
  }

  if(thisOpen){  

    const childOfOpen = thisOpen.firstElementChild; //#text->input
    const placeHolder = childOfOpen.dataset.placeholder;

    childOfOpen.setAttribute("placeHolder", placeHolder);
    thisOpen.setAttribute("data-status", "close");

  }
}





