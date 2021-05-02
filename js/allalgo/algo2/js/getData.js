class GetData{

    constructor(){
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
                
        init.hashData.forEach((recipe,key) => {  
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
