class GlobalSearch{

    constructor(){
            
        this.input = document.querySelector('.search input')
        this.resultRecipes = dataJSON
        /**
         * L'événement utilise une fonction debounce pour limiter
         * le nombre d'apelle à l'API
         */

        this.input.addEventListener('keyup',debounce((e)=>{


            if(e.target.value.match(/^[A-Za-zÀ-ÿ\d\-\s]+$/) && e.key !==' '){

                if(e.target.value.length > 2){
                getData.JSON = alterate.JSON 
                removeAllTags()
                this.request(e.target.value)
                }

            }else if (!e.target.value.match(/^[A-Za-zÀ-ÿ\d\-\s]+$/) && e.target.value !== ""){

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

      
        getData.jsonData = alterate.normalizeData


        if(sessionStorage.getItem(keyWords)){

            this.uniqueID = JSON.parse(sessionStorage.getItem(keyWords))  
            console.log(this.uniqueID);

        }else{

            const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
            
            this.uniqueID = getData.getIDGlobalSearch(keyWordsArray)

            //Ajout du resultat dans le sesssionsStorage
            const storageArray = JSON.stringify(this.uniqueID)
            sessionStorage.setItem(keyWords, storageArray)

        }
     
        
        if(this.uniqueID.size > 0){

            const recipesByID  =  getData.getRecipeByID(this.uniqueID); 
            this.showResult(recipesByID)
            this.cleanListing(keyWords)

        }else{    
            showMessage('error','Aucun résultat')
              
        }       
    }

    showResult(resultByID){

        delRecipes() 
        showRecipesByID(resultByID)                
        //MAJLISITNG + suppr TArget                
        majListing(resultByID)                
        //On réinitilise le clique dans les nouveaux listing
        init.options.forEach(O =>{                 
            window.listingEvent =   new ListingEvent(O)              
        })  

        this.resultRecipes  = resultByID
        //redifinie le tableau des recettes dans laquelle la recherche s'effectue
        getData.jsonData = alterate.recipes = resultByID

        

    }

    cleanListing(keyWords){
         // Supprime les mots clefs qui matchent dans les listing
         const keyWordsArray = keyWords.split(' ')            
         keyWordsArray.forEach(delThis => {
             removeTagInListing(delThis) 
         });
    }
}


const globalSearch =  new GlobalSearch()