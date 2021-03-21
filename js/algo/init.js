
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

    const recipesComponent = makeComponent(new createRecipe(recipes))
    const targetRenderRecipes =  document.querySelector('.mainWrapper')
    renderComponent(recipesComponent,targetRenderRecipes)

    }

}

new init()





// Toutes les entrées relatives au ingredients/appareil/ustensiles sont demandés au démarrgae de l'application
// Code migrant accessible dans tout les scopes fermer


const dataIng = getData.allDataLowerLevel('ingredients','ingredient');
const dataUst = getData.allDataLowerLevel('ustensils','ustensils'); 
const dataApp = getData.allDataRoot('appliance'); 



