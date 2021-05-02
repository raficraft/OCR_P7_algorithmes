

class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes
      this.recipes = dataJSON 
      this.globalOptions = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' },
      ] 
      this.dictionnaryFields = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'appliance', fields : 'appliance' , depth : 'root' },
        {context : 'ustensils', fields : 'ustensils' , depth : 'lowerlevel' },
      ] 
      // Fabrique un dictionnaire des termes de recherche validé
      this.dictionnary = this.createDictionnary()
      console.log(this.dictionnary);
      this.hashData = this.hashJson()
      
    }

    // Aplatit les différents champ JSON en une string unique
    // Afin de diminuer le temps de recherche

    createDictionnary(){

        const dictionnary =[]    

        this.recipes.forEach(recipe =>{

            const recipesKeys = Object.keys(recipe)

            recipesKeys.forEach(key =>{
                if(key === 'name' || key === 'ingredients' || key === 'appliance' || key === ''){
                    if(typeof(recipe[key]) !== 'object'){
                    
                    if(!dictionnary.includes(recipe[key])){
                        dictionnary.push(normalizeString(recipe[key]))
                    }

                   
                    }else if(typeof(recipe[key]) === 'object'){

                        recipe[key].forEach(element => {
                                                       
                            if(typeof(element)  === 'string'){
                                if(!dictionnary.includes(element)){
                                    dictionnary.push(normalizeString(element))
                                }
                            }else{
                                
                                if(!dictionnary.includes(element['ingredient'])){
                                    dictionnary.push(normalizeString(element['ingredient']))
                                }

                            }
                            
                        });

                    }
                }
            })
        })

        return dictionnary;

    }

    
    hashJson(){

        const result = []

        this.dictionnaryFields.forEach(options => {

            switch(options.depth){
                case 'root' :

                    this.recipes.forEach((recipe) => {  

                        if(!result[recipe.id]){
                            result[recipe.id] = []
                        }
                        if(options.fields === 'description'){
                        const cleanEntries = this.removeStopWords(recipe[options.fields],this.dictionnary,'keep')
                       
                        console.log(cleanEntries);
                        result[recipe.id] += normalizeString(`${cleanEntries} `)
                        }else{
                            result[recipe.id] += normalizeString(`${recipe[options.fields]} `)
                        }
                        
                    })

                break;

                case 'lowerLevel':

                    this.recipes.forEach(recipe => {
    
                        recipe[options.context].forEach(el => {

                            if(!result[recipe.id]){
                                result[recipe.id] = []
                            }
                                                      
                            result[recipe.id] += normalizeString(`${el[options.fields]} `)
                            

                         })
                    })

                break;
            }            
        });

        console.log(result);

        return result
 
    }


    removeStopWords(str,dictionnary,action){

        str = str.toString()
        const res = []
        const words = str.split(' ')
        for(let i=0;i<words.length;i++) {
            let word_clean = words[i].split(".").join("")
            if(action === 'remove'){
                if(!dictionnary.includes(word_clean)) {
                    res.push(word_clean)
                }
            }else if(action === 'keep'){                
                if(dictionnary.includes(word_clean)) {                    
                    res.push(word_clean)
                }
            }
        }
        return(res.join(' '))
    }
    
}


const init = new Init()
