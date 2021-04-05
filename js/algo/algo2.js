class GlobalSearch{

    constructor(){
            
        this.input = document.querySelector('.search input')
        this.resultRecipes = dataJSON

        this.input.addEventListener('keyup',debounce((e)=>{


            console.error(e.target.value);


            if(e.target.value.match(/^[a-zA-Z\d\-\s]+$/) && e.key!==' '){

                console.log(e.target.value);

                if(e.target.value.length > 2){
                getData.JSON = dataJSON
                removeAllTags()
                this.request(e.target.value)
                }

            }else if (!e.target.value.match(/^[a-zA-Z\d\-\s]+$/) && e.target.value !== ""){

                showMessage(
                    'error',
                    'Caractère invalide, veuillez saisir des caratères alphabétiques seulement.'
                )  

            }else if(e.target.value === ''){

                delRecipes()           
                new Init

            }
        },300))
    }

    request(keyWords){

        keyWords = keyWords.trim().replace(/  +/g, ' ') //vire tous les espaces comprit dans la chaîne de caractères      
        const idByGlobal = idByGlobalSearch(keyWords)
        const uniqueID = getUniqueID(idByGlobal) 
        
        if(uniqueID.length > 0){

            const recipesByID  =  getData.getRecipeByID(uniqueID);
            this.resultRecipes  = recipesByID
            delRecipes() 
            showRecipesByID(recipesByID)                
            //MAJLISITNG + suppr TArget                
            majListing(recipesByID)                
            //On réinitilise le clique dans les nouveaux listing
            init.options.forEach(O =>{                 
                window.listingEvent =   new ListingEvent(O)              
            })     
            
            // Supprime les mots clefs qui matchent dans les listing
            const keyWordsArray = keyWords.split(' ')            
            keyWordsArray.forEach(delThis => {
                console.log(delThis);
                removeTagInListing(delThis) 
            });

            //redifinie le tableau des recettes dans laquelle la recherche s'effectue
            getData.JSON = recipesByID 

        }else{    
            showMessage('error','Aucun résultat')    
        }

       
    }
}


const globalSearch =  new GlobalSearch()