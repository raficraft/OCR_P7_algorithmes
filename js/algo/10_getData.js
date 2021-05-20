class GetData{

    constructor(){
        this.recipes = dataJSON                  
        this.JSON = alterate.JSON
        this.flatJSON = alterate.flatJSON

        console.log(this.JSON);
    }

    allDataType(options){

        let result = []
        switch(options.depth){

            case 'root':

                this.JSON.forEach(recipe => {
                    if(!result.includes(recipe[options.fields])){
                        result.push(recipe[options.fields])
                    }           
                });

            break;

            case 'lowerLevel':             
            
            this.JSON.forEach(recipe => {
    
                recipe[options.context].forEach(el => {                
    
                    options.context !== options.fields ? el = el[options.fields] : el //Tableau associatif {else} tableau unidimensionelle [ternaire]
                    
                    if(!result.includes(el)){  result.push(el); } 
                });            
            });

           break;
        }
        return result
    }

    specificData(options){

        console.log(options.search);
        console.log(options);
        console.log(this.JSON);

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
        
                    thisArray.forEach((el) => {
        
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

        console.log(result);

        return result
    }

    getRecipeByID(data){

        console.log(data);

        let result = []
        data.forEach((el)=>{       
          
            result.push(this.recipes.find(recipes => recipes.id === el))
        })
        console.log(result);
        return result
    }

    
}