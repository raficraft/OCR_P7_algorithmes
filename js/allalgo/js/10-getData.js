class GetData{

    constructor(){
        console.log(alterate.recipes);
        this.JSON = alterate.normalizeData; // Si fetch {new getJSON(dataJSON)}         
    }

    /**
     * Algo V4
     * @param {*} options 
     * @returns 
     */
    testNewLogic(options){        

        const result = new Set()

        const keyWordsArray = options.search.trim().replace(/  +/g, ' ').split(' ') 

        keyWordsArray.forEach(search => {
        options.forEach(O => {
            console.log(O);

            this.JSON.forEach(recipe => {

               const resultID = this.readField(recipe, recipe[O.context],O.fields,search)

               if(resultID){
                   result.add(resultID)
               }
                
            });            
        });
        });

        return result
    }


    readField(line, fieldsValue , fields = false,search){

      switch(typeof(fieldsValue)){

        case 'string': 

            if(fieldsValue.includes(search)){
                return line.id;
            }
              
        break;
        case 'number':

            
        break;
        case 'object': 

        fieldsValue.forEach(thisObject => {

            const objectFields = thisObject[fields]

            return this.readField(line ,objectFields,fields,search)
            
        });

        break;
      }
        
    }


    getRecipeByID(data){
        let result = []
        data.forEach((el)=>{           
            result.push(this.JSON.find(recipes => recipes.id === el))
        })
        return result
    }
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
  

/**
 * Trie les ID des différents tableaux de resultat {getIdBy...}
 * pour ne conserver que les ID unique et obtenir un
 * tableau de comparaison. [refactoring voir new set à utiliser en amont ??]
 * @param {*} thisData 
 * @returns 
 */
const getUniqueIDinSingleLoop = (thisData) =>{ 

    comparaisonChart = new Set()

    thisData.forEach((data) => {  
        let hasValid = comparaisonChart.has(data.idRecipe)
        if(!hasValid){
        comparaisonChart.add(data.idRecipe)
        }          
     
    });

    return comparaisonChart
}    


const algoRecursive = (keyWords)=>{

    init.globalOptions.search = keyWords
    const uniqueID = getData.testNewLogic(init.globalOptions)
    return  getData.getRecipeByID(uniqueID);  
  
}


const getData = new GetData()