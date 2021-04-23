

const algoBasique = (keyWords)=>{


    const request = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' }
      ]  

    //nettoyage de la chaine de caractère passé en params
    keyWords = keyWords.trim().replace(/  +/g, ' ').split(' ')    

    
    const idByGlobal = []  


    // GetIdResult
    
    keyWords.forEach(search => {
  
        // Verifie en amont si le mot clef Demandé renvoie
        // au moins des resultat non null dans un des champs de
        // recherche [name, ingredients, description]
        const validSearch = checkResultKeyWords(search)
  
        request.forEach(O => {
  
          O.search = search
          const result  = getData.specificData(O) 
  
            if(validSearch === true){

                if(result.length > 0){
    
                    idByGlobal.push(result); 

                }else{
                    console.log(`Dans le champ de recherche "${O.context}"  aucun résultat pour le mot clef "${O.search}"`);
                }
    
            }else{
                console.log(`ce mot clef "${search}" à été exclue de la recherche`);
            }
        
  
        });  
  
      });


    console.log(idByGlobal);

    //GetUniqueID

    comparaisonChart = []

    idByGlobal.forEach(data =>{
        data.forEach((value) => {
            if (!comparaisonChart.includes(value.idRecipe)) {
                comparaisonChart.push(value.idRecipe);
            }
        });
    })

    console.log(comparaisonChart);

    const recipesByID  =  getData.getRecipeByID(comparaisonChart);  

    console.log(recipesByID);

 
}


algoBasique('tomate ail  lolololol')