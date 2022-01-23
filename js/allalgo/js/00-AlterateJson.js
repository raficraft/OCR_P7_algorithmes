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

class AlterateJson{

    constructor(){

        this.recipes = dataJSON
        this.dictionnaryFields = [
            {context : 'name', fields : 'name' , depth : 'root' },
            {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
            {context : 'appliance', fields : 'appliance' , depth : 'root' },
            {context : 'ustensils', fields : 'ustensils' , depth : 'lowerLevel' },
        ] 
        this.dictionnary = this.createDictionnary()
        console.log(this.dictionnary);
        this.flatData = this.flatJson()                
        this.normalizeData = this.normalizeJson()

        console.log(this.flatData);
        console.log(this.normalizeData);
    }

    flatJson(){

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
                            
                            if(!result[recipe.id]){  result[recipe.id] = [] }
                            if(options.context !== options.fields){el = el[options.fields]}
                                                      
                            result[recipe.id] += normalizeString(`${el} `)                           

                         })
                    })
                break;
            }            
        });
        return result
 
    }
    /**
     * 
     * @returns 
     */
    createDictionnary(){

        const dictionnary =[]    

        this.recipes.forEach(recipe =>{

            const recipesKeys = Object.keys(recipe)

            recipesKeys.forEach(key =>{
                if(key === 'name' || key === 'ingredients' || key === 'appliance' || key === 'ustensils'){
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

    /**
     * 
     * @param {*} str 
     * @param {*} dictionnary 
     * @param {*} action 
     * @returns 
     */
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

    /*Enlève tout les accents des champs ciblé*/
    normalizeJson(){

        const newJSON = []

        this.recipes.forEach((recipe,key) => {
        //  console.log(recipe);
            const thisKey = Object.keys(recipe)
            newJSON[key] = {}

            thisKey.forEach(fields => {                

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

const alterate = new AlterateJson()