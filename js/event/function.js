
const sortSuggestion = (thisData) => {

  let result =[]
  thisData.forEach((el) => {
    if (!result.includes(el.value)) {
      result.push(el.value);
    }
  });

  return result

}

const getIdBykeyWord = (target) => {

          
  let idBykeywords = []
  let allElems = []
  allElems.push(target)


  const tags = document.querySelectorAll(".filterResult [data-tag]");


  if (tags.length > 0) {  tags.forEach((el) => allElems.push(el)); }

  allElems.forEach((els) => {

      const options = els.dataset;
      options.search = els.dataset.value;
      idBykeywords.push(getData.specificData(options))

  });

  /***/
 return idBykeywords
}

const getUniqueID = (thisData) =>{

  comparaisonChart = []

  thisData.forEach((data) => {
    data.forEach((value) => {
      if (!comparaisonChart.includes(value.idRecipe)) {
          comparaisonChart.push(value.idRecipe);
      }
    });
  });

  return comparaisonChart

}

const sortIdInAllArray = (idByKeyWords,comparaisonChart)=>{

  const sortId = (
    idByKeyWords,
    limit,
    count,
    comparaisonChart,
    idValid = []
  ) => {

    idByKeyWords[count].forEach((el) => {
      comparaisonChart.forEach((idControl) => {
        if (el.idRecipe === idControl) {
          if (!idValid.toString().includes(el.idRecipe.toString())) {
            idValid.push(el.idRecipe);
          }
        }
      });
    });

    count++;
    if (count === limit) {
      return idValid;
    } else if (count < limit) {
      comparaisonChart = idValid;
      return sortId(idByKeyWords, limit, count, comparaisonChart);
      //return sortId(idByKeyWords, limit, count, idValid); ???
    }
  };

  const limit = idByKeyWords.length
  let IDresult = sortId(idByKeyWords,limit,0,comparaisonChart)

  return IDresult
}

const delRecipes = ()=>{

  console.error('reset des recettes');
  
  if (document.querySelectorAll(".sticker").length > 0) {
      let removethis = document.querySelectorAll(".sticker");
      removethis.forEach((el) => {
          el.remove();
      });
  } 


}

const showRecipesByID = (recipes) => {

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
                showNewListing(req,newListing)

            break;


            case "root":


              recipesByID.forEach((recipe) => {  
                if(!newListing.includes(recipe.appliance)){
                  
                  newListing.push(recipe.appliance)
                }
              }) 

              showNewListing(req,newListing)

            break;
         }
       });


       //On supprime les tags dans les list
    

}

const showNewListing = (req,newListing) => {

  let targetLabel = document.querySelector(`#inputTrigger--${req.context}`);
  thisListing = makeComponent(new createListing(newListing, req));
  const rootElement = document.querySelector(`#inputTrigger--${req.context} ul`)
  if(rootElement){
  document.querySelector(`#inputTrigger--${req.context} ul`).remove()
  }
  renderComponent(thisListing, targetLabel);

}



const filterNewListingByTags = () => {


  const allTags = document.querySelectorAll('.filterTag')

  allTags.forEach(tag => {
  
    const checkValue = tag.dataset.value
    const removeThis = document.querySelector(`li[data-value="${checkValue}"]`)
    removeThis.remove()
  
  });


}





/// TAGS


const getIdByTags = ()=>{




}

