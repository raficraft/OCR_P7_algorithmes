class GetData{


    constructor(){
        this.JSON = recipes; // Si fetch {new getJSON(recipes)}     
    }


    allDataRoot(fields){

        let result = []
        this.JSON.forEach(recipe => {
            if(!result.includes(recipe[fields])){
                result.push(recipe[fields])
            }           
        });
        return result
    }


    allDataLowerLevel(context,fields){

        let result = []
        this.JSON.forEach(recipe => {

            recipe[context].forEach(el => {                

                context !== fields ? el = el[fields] : el //Tableau associatif {else} tableau unidimensionelle [ternaire]
                
                if(!result.includes(el)){  result.push(el); } 
            });            
        });
        return result
    }

      
    specificDataRoot = (search, fields) => {
        
        let result = []
        this.JSON.forEach((recipe,key) => {  
            if(normalizeString(recipe[fields]).includes(normalizeString(search))){
               result.push({idRecipe : recipe.id, value: recipe[fields]}) ;
            }
        })  

        return result;
    }

    specificDataLowerLevel = (search, fields, context) => {
        
        let result = []
        this.JSON.forEach(recipe => {
            
            const thisArray = recipe[context]          

            thisArray.filter((el) => {

                if(fields !== context){ el = el[fields]}
                
                if(normalizeString(el).includes(normalizeString(search))){ 
                    result.push({idRecipe : recipe.id, value: el}) ;
                }
            })             
        })  

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