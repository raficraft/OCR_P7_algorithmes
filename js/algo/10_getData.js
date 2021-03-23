class GetData{


    constructor(){
        this.JSON = dataJSON; // Si fetch {new getJSON(dataJSON)}     
    }


    allDataRoot(options){
        console.log(options.context);

        let result = []
        this.JSON.forEach(recipe => {
            if(!result.includes(recipe[options.fields])){
                result.push(recipe[options.fields])
            }           
        });
        return result
    }


    allDataLowerLevel(options){

        console.log(options.context);

        let result = []
        this.JSON.forEach(recipe => {

            recipe[options.context].forEach(el => {                

                options.context !== options.fields ? el = el[options.fields] : el //Tableau associatif {else} tableau unidimensionelle [ternaire]
                
                if(!result.includes(el)){  result.push(el); } 
            });            
        });
        return result
    }

      
    specificDataRoot = (options) => {
        
        let result = []
        this.JSON.forEach((recipe) => {  
            if(normalizeString(recipe[options.fields]).includes(normalizeString(options.search))){
               result.push({idRecipe : recipe.id, value: recipe[options.fields]}) ;
            }
        })  
        console.error(result);
        return result;
    }

    specificDataLowerLevel = (options) => {
        
        let result = []
        this.JSON.forEach(recipe => {
            
            const thisArray = recipe[options.context]          

            thisArray.filter((el) => {

                if(options.fields !== options.context){ el = el[options.fields]}
                
                if(normalizeString(el).includes(normalizeString(options.search))){ 
                    result.push({idRecipe : recipe.id, value: el}) ;
                }
            })             
        })  
         console.error(result);
        return result;
    }

    getRecipeByID = (data) => {

        let result = []
        data.forEach((el)=>{           
            result.push(this.JSON.find(recipes => recipes.id === el))
        })

        return result
    }
}