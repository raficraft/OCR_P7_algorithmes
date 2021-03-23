class listing{

    constructor(thisData,options){



        this.elHTML = `<ul id="inputList--${options.context}" class="inputList color--${options.context}">`

            if(thisData.length > 0){

            thisData.forEach((data,key) => {
                //On limite le nombre d'ingrédients afficher
                if(key <= 29){
                    this.elHTML += `<li data-js="getTag" 
                    data-context="${options.context}" 
                    data-fields=${options.fields} 
                    data-depth=${options.depth}
                    data-value="${data}"
                    >${data}</li>`;  
                }        
            });
            }else{
                this.elHTML += `<li class="ListError">Aucun résultat</li>` 
            }
        this.elHTML += `</ul>`


    }

}