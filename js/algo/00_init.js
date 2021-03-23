
// Placé dans une class workShop

//Method 1
const makeComponent = (callback) => {
    
    let makeComponent = []    
    makeComponent = callback    
    return makeComponent       
}


//Method 2
/** 
 * @param {Object} injectThis Element HTML commandé par la factory au usine factory/workshop.js
 * @param {HTMLElement} target 
 */
function renderComponent(injectThis,target){

    if(!injectThis.length){
            target.insertAdjacentHTML("beforeend",injectThis.elHTML)
    }else{
        injectThis.map(function(injectThis){
            target.insertAdjacentHTML("beforeend",injectThis.elHTML)   
        })
    }  
}


//

const searchSpecific = new SearchData()
const getData = new GetData()


class init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes

      const recipesComponent = makeComponent(new createRecipe(dataJSON));
      const targetRenderRecipes = document.querySelector(".mainWrapper");
      renderComponent(recipesComponent, targetRenderRecipes);

      // Toutes les entrées relatives au ingredients/appareil/ustensiles sont demandés au démarrgae de l'application
      // Code migrant accessible dans tout les scopes fermer

      const optionsIng = document.querySelector(
        "#inputTrigger--ingredients INPUT"
      ).dataset;
      const dataIng = getData.allDataLowerLevel(optionsIng);

      const optionsUst = document.querySelector(
        "#inputTrigger--ustensils INPUT"
      ).dataset;
      const dataUst = getData.allDataLowerLevel(optionsUst);

      const optionsApp = document.querySelector(
        "#inputTrigger--appliance INPUT"
      ).dataset;
      const dataApp = getData.allDataRoot(optionsApp);
    }

}

new init()









