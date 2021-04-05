

const algoBasique = (keyWords)=>{


    const request = [
        {context : 'name', fields : 'name' , depth : 'root' },
        {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
        {context : 'description', fields : 'description' , depth : 'root' }
      ]  

    //nettoyage de la chaine de caractère passé en params
    keyWords = keyWords.trim().replace(/  +/g, ' ').split(' ')


    keyWords.forEach(keyword => {

        request.forEach(req => {

            req.search = keyword
            console.log(req);


            
        });        
    });






}
//algoBasique('tomate ail             blender')