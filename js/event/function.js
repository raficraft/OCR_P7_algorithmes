
const sortSuggestion = (thisData) => {
  

  let result =[]
  thisData.forEach((el) => {
    if (!result.includes(el.value)) {
      result.push(el.value);
    }
  });

  return result

}

const idByGlobalSearch = (keyWords)=>{

  const idByGlobal = []
  
  const keyWordsArray = keyWords.split(' ') 

    keyWordsArray.forEach(search => {

      // Verifie en amont si le mot clef Demandé renvoie
      // au moins des resultat non null dans une des champs de
      // recherche [name, ingredients, description]
      const validSearch = checkResultKeyWords(search)

      init.globalOptions.forEach(O => {

        O.search = search
        const result  = getData.specificData(O)  

        if(validSearch === true){

          idByGlobal.push(result); 

        }else{

          //On supprime le mot clef qui ne renvoie pas de résultat, du champ de recherche  
          thisInput = document.querySelector('.search input')
          const str = thisInput.value
          thisInput.value = str.replace(`${search}` , '')

        }

      });  

    });

  console.log(idByGlobal);
  return idByGlobal

}

const getIdByTags = (tags) =>{

  const idByTags = []

  if(document.querySelector('.search input').value !==''){
    idByTags.push(idByGlobalSearch(document.querySelector('.search input').value))
  }

  tags.forEach((tag)=>{

      const options = tag.dataset
      options.search = tag.dataset.value
      idByTags.push(getData.specificData(options))
  })

  return idByTags

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

  console.log(idBykeywords);
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

  console.error(recipes.length);
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
  console.log('del');

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
                console.log(newListing);
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

  console.log(req.context);  
  console.log(newListing);

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

  console.log('on ferme');
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


const checkResultKeyWords = (search) => {


    let checkSearch  = false
    init.globalOptions.forEach(O => {

    O.search = search
    const result  = getData.specificData(O) 
    

    if(checkSearch === false){
      if(result.length > 0 ){
        checkSearch = true
      }
    }


    });  

    return checkSearch

}


