 
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

    return finalResult

}



