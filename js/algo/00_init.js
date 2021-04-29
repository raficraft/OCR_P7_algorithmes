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
const renderComponent = (injectThis,target) => {



    if(!injectThis.length){
            target.insertAdjacentHTML("beforeend",injectThis.elHTML)
    }else{
        injectThis.map(function(injectThis){
            target.insertAdjacentHTML("beforeend",injectThis.elHTML)   
        })
    }  
}

//
const getData = new GetData()

class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes
      this.options = this.getOption() 
      this.dataType = this.getAllType()  // Listing Complet des ingrédients // appliance et ustensils   
      this.recipes = this.normalizeJSON(dataJSON)
      this.globalOptions = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' }
      ]  

      //Execution des méthode à l'instanciation
      this.renderListing()
      this.renderRecipes()
    }
    
    normalizeJSON(JSON){

        // console.log(JSON);
  
          const newJSON = []
  
          JSON.forEach((recipe,key) => {
  
          //  console.log(recipe);
              const thisKey = Object.keys(recipe)
              newJSON[key] = {}
             
  
              thisKey.forEach(fields => {
                  
                  
                 // console.log(typeof(recipe[fields]));
  
                  switch(typeof(recipe[fields])){
  
                      case 'string': 
  
                      newJSON[key][fields] = normalizeString(recipe[fields])                  
                      
                      break
                      case 'number':
                      newJSON[key][fields] = recipe[fields]
                      break
                      case 'object': 
  
                      newJSON[key][fields] = []
  
                      recipe[fields].forEach(lowerLevel => {
  
                          switch(typeof(lowerLevel)){
  
                              case 'string':
  
                              newJSON[key][fields].push(normalizeString(lowerLevel))
                                  
                              break;
                              case 'object': 
  
                              const newEntries = {}
  
                              const lowerLevelKeys = Object.keys(lowerLevel)
                              lowerLevelKeys.forEach(thisKeys => {
                                  
                                 // console.log(thisKeys);
                                 // console.log(lowerLevel[thisKeys]);
                                 newEntries[thisKeys] = normalizeString(lowerLevel[thisKeys])
  
                                 /* switch(lowerLevel[thisKeys]){
                                      case 'string': 
  
                                      newEntries[thisKeys] = normalizeString(lowerLevel[thisKeys])
                                      
                                      break
                                      case 'number': 
                                      newEntries[thisKeys] = lowerLevel[thisKeys]
                                      break
  
                                  }*/
  
                              });
  
                              newJSON[key][fields].push(newEntries)
                              
                              //console.log(newEntries);
                              
                              break;
                          }
                          
                      });
                       
                      break
                  }
              });
  
              
          });
          
          return newJSON
    }

    getOption(){
       const allSug = document.querySelectorAll('[data-sugg]')
       //On créait le tableau des options à partir des INPUT

       let options = []
       allSug.forEach(sugg=>{
       options.push(sugg.dataset)       
       })   

      return options
    }

    getAllType(){

        let dataType =[]
        this.options.forEach(O => {
            dataType[O.context] = (getData.allDataType(O))
        })

        let optionsGlobalSearch = [
            {js : 'global',context : 'name',fields :  'name',depth : 'root'},
            {js : 'global',context : 'description',fields :  'description',depth : 'root'},
        ]

        let dataGlobal = []
        optionsGlobalSearch.forEach(O=>{
            dataGlobal[O.context] = (getData.allDataType(O))
        })
        const allData =  Object.assign({}, dataType, dataGlobal);

        return allData

    }

    renderListing(){
        
        this.options.forEach(O => {

            console.log(O);

            let data = getData.allDataType(O)
            const listingContainer = document.querySelector(`#inputList--${O.context}`)

            if(listingContainer){
                listingContainer.remove()
            }

            const listingComponent = makeComponent(new createListing(data,O));
            const targetListing = document.querySelector(`#inputTrigger--${O.context}`);
            renderComponent(listingComponent, targetListing);
            window.listingEvent
            window.listingEvent = new ListingEvent(O)
            
        });        
    }

    // Affichage de toutes les recettes
    renderRecipes(){
        const recipesComponent = makeComponent(new createRecipe(dataJSON));
        const targetRenderRecipes = document.querySelector("#main");
        renderComponent(recipesComponent, targetRenderRecipes);
    }
}


const init = new Init()
