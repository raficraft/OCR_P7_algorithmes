class GetData{

    constructor(){
        this.jsonData = alterate.recipes; // Si fetch {new getJSON(dataJSON)} 
    }



    allDataType(options){

        let result = []
        switch(options.depth){

            case 'root':

                this.jsonData.forEach(recipe => {
                    if(!result.includes(recipe[options.fields])){
                        result.push(recipe[options.fields])
                    }           
                });

            break;

            case 'lowerLevel':             
            
            this.jsonData.forEach(recipe => {
    
                recipe[options.context].forEach(el => {                
    
                    options.context !== options.fields ? el = el[options.fields] : el //Tableau associatif {else} tableau unidimensionelle [ternaire]
                    
                    if(!result.includes(el)){  result.push(el); } 
                });            
            });

           break;
        }
        return result
    }

    searchInHashJson(options){

        


    }


    specificData(options){

        console.log(options.search);

        let result = []
        switch(options.depth){

            case 'root':
                alterate.normalizeData.forEach((recipe) => {  
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

                alterate.normalizeData.forEach(recipe => {                    
                
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
            result.push(this.jsonData.find(recipes => recipes.id === el))
        })
        return result
    }

    
}