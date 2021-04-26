/** * 
 * @param {string} str 
 * @returns Une chaine de caratère standart
 */
 const normalizeString = (str) =>{

    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes
      this.recipes = dataJSON 
      this.globalOptions = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' }
      ] 
      
    }
}


const init = new Init()


class GetData{

    constructor(){
        this.JSON = init.recipes; // Si fetch {new getJSON(dataJSON)} 
        this.hashData = this.hashJson(this.JSON)
        
    }

    // Aplatit les différents champ JSON en une string unique
    // Afin de faciliter le temps de recherche

    hashJson(data){

        const result = []

        init.globalOptions.forEach(options => {

            switch(options.depth){
                case 'root' :

                    data.forEach((recipe) => {  

                        if(!result[recipe.id]){
                            result[recipe.id] = []
                        }
                        result[recipe.id] += normalizeString(` ${recipe[options.fields]}`)
                        
                    })

                break;

                case 'lowerLevel':

                    data.forEach(recipe => {
    
                        recipe[options.context].forEach(el => {

                            if(!result[recipe.id]){
                                result[recipe.id] = []
                            }

                            result[recipe.id] += normalizeString(` ${el[options.fields]}`)

                         })
                    })

                break;
            }            
        });

        return result
 
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
                
        this.hashData.forEach((recipe,key) => {  
            if(recipe.includes(options.search)){              
                result.push(key)
            }
        })      
        
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
            data.forEach((value,key) => {             
                let hasValid = comparaisonChart.has(value)
                if(!hasValid){
                comparaisonChart.add(value)
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
    const finalResult  =  getData.getRecipeByID(uniqueID);  


    //console.log(finalResult);
}


console.time("pouet pouet")
for(let i = 0; i < 2000; i++){
algoBasique('tomate')
}
console.timeEnd("pouet pouet")
