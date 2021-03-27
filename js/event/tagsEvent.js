class TagsEvent{

    constructor(){


        this.tags = document.querySelectorAll('.filterTag')
        this.tags.forEach(tag =>{

            this.closeBtn = tag.firstElementChild
            this.closeBtn.addEventListener('click',(e) =>{
                e.preventDefault();   e.stopPropagation();                
                this.closeParent(tag)    
            })         
        })
    }

    closeParent(parent){

        parent.remove()
        const tagsLength = this.tags.length;

        this.redifineRecipe()

    }


    redifineRecipe(){
        
        this.tags = document.querySelectorAll('.filterTag')

        if(this.tags.length > 0 ){

            
            const idByTags = this.getIdByTags(this.tags)
            const uniqueID     = getUniqueID(idByTags)       
            const validID      = sortIdInAllArray(idByTags,uniqueID)
           

            if(validID.length > 0){

                const recipesByID  =  getData.getRecipeByID(validID);
                delRecipes() 
                showRecipesByID(recipesByID)
                
                //MAJLISITNG + suppr TArget
                
                majListing(recipesByID)
                
                //On réinitilise le clique dans les nouveaux listing
                init.options.forEach(O =>{  new ListingEvent(O)  })
               
                filterNewListingByTags()
    
    
            }else{
    
               //console.error('Aucun Résultat');
    
            }
            


        }else{

            delRecipes() 
            const init = new Init

        }

     

    }

    getIdByTags(tags){

        const idByTags = []

        tags.forEach((tag)=>{

            const options = tag.dataset
            options.search = tag.dataset.value
            idByTags.push(getData.specificData(options))
        })

        return idByTags

    }


}