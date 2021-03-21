class listing{

    constructor(thisData,context){


        console.log(thisData);

        this.elHTML = `<ul id="inputList--${context}" class="inputList color--${context}">`

            if(thisData.length > 0){

            thisData.forEach((data,key) => {
                //On limite le nombre d'ingrédients afficher
                if(key <= 29){
                    this.elHTML += `<li data-js="getTag">${data}</li>`;  
                }        
            });
            }else{
                this.elHTML += `<li class="ListError">Aucun résultat</li>` 
            }
        this.elHTML += `</ul>`


    }

}