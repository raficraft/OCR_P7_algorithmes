/** * 
 * @param {string} str 
 * @returns Une chaine de caratère standart
 */
 const normalizeString = (str) =>{

    return str
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/*Empeche la function passé en callBack 
  de se déclenché à chaque event dans un certain délai.
   Elle ne ce déclenchera que si le délay passé et 
   supérieur entre deux event de même nature
*/

debounce = (callback, delay) => {
    let timer;
    return function(){
        let args = arguments;
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, delay)
    }
}

class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes
      this.recipes = this.normalizeJSON(dataJSON)

      this.globalOptions = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' }
       ]          
    }

    /**
     * Vire Tout les accents présent dans les champs de type string du fichier Json
     * @param {*} JSON 
     * @returns newJson
     */

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
                                
                               newEntries[thisKeys] = normalizeString(lowerLevel[thisKeys])
                         

                            });

                            newJSON[key][fields].push(newEntries)
                            
                            
                            break;
                        }
                        
                    });
                     
                    break
                }
            });

            
        });
        
        return newJSON
    }
}


const init = new Init()


class GetData{

    constructor(){
        console.log(init.recipes);
        this.JSON = init.recipes; // Si fetch {new getJSON(dataJSON)} 
    }

    allDataType(options){

        let result = []
        switch(options.depth){

            case 'root':

                this.JSON.forEach(recipe => {
                    if(!normalizeString(result).includes(recipe[options.fields])){
                        result.push(recipe[options.fields])
                    }           
                });

            break;

            case 'lowerLevel':             
            
            this.JSON.forEach(recipe => {
    
                recipe[options.context].forEach(el => { 
                    //Tableau associatif {else} tableau unidimensionelle [ternaire]
                    options.context !== options.fields ? el = el[options.fields] : el                     
                    if(!normalizeString(result).includes(el)){  result.push(el); } 
                });            
            });

           break;
        }
        return result
    }


    specificData(options){
        let result = []
        switch(options.depth){

            case 'root':
                this.JSON.forEach((recipe) => {  
                    if(recipe[options.fields].includes(options.search)){
                       result.push({
                         idRecipe: recipe.id,
                         value: recipe[options.fields],
                         context: options.context,
                         fields: options.fields,
                         depth: options.depth,
                         search: options.search,
                       });
                    }
                })  

                
            break;

            case 'lowerLevel': 
                this.JSON.forEach(recipe => {
                
                    const thisArray = recipe[options.context]          
        
                    thisArray.filter((el) => {
        
                        if(options.fields !== options.context){ el = el[options.fields]}
                        
                        if(el.includes(options.search)){ 
                            result.push({
                            idRecipe: recipe.id,
                            value: el,
                            context: options.context,
                            fields: options.fields,
                            depth: options.depth,
                            search: options.search,
                            });
                        }
                    })             
                })    

            break;
        }
        return result
    }

    getRecipeByID(data){
        let result = []
        data.forEach((el)=>{           
            result.push(this.JSON.find(recipes => recipes.id === el))
        })
        return result
    }
}

const getData = new GetData()

/** */

    
/**
 * Recheche les ID des recettes par mots clef
 * Renvoie un Tableau d'object contenant les resultat obtenue
 * sur les 3 champs de la recherche global
 * {name , description, ingredients} * 
 * @param {string} keyWords 
 * @returns {array} 
 */
const idByGlobalSearch = (keyWords)=>{

    const idByGlobal = [] 

    keyWords.forEach(search => {     

        init.globalOptions.forEach(Options => {

        Options.search = normalizeString(search)
        const result  = getData.specificData(Options) 
            idByGlobal.push(result);        
        });  
    });
    //console.log(idByGlobal);
    return idByGlobal
}

/**
 * Trie les ID des différents tableaux de resultat {getIdBy...}
 * pour ne conserver que les ID unique et obtenir un
 * tableau de comparaison. [refactoring voir new set à utiliser en amont ??]
 * @param {*} thisData 
 * @returns 
 */
const getUniqueID = (thisData) =>{  

    comparaisonChart = new Set()

    thisData.forEach((data) => {
        if(data.length>0){
            data.forEach((value) => {             
                let hasValid = comparaisonChart.has(value.idRecipe)
                if(!hasValid){
                comparaisonChart.add(value.idRecipe)
                }
            });
        }
    });
    //console.log(comparaisonChart);
    return comparaisonChart
}    





















const algoBasique = (keyWords)=>{

    //Nettoyage de tous les espaces comprit dans la chaîne de caractères 
    const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ')        
    const idByGlobal = idByGlobalSearch(keyWordsArray)
    const uniqueID = getUniqueID(idByGlobal) 
    return  getData.getRecipeByID(uniqueID);  
  
}


