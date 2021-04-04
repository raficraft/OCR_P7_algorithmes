class TagsEvent{

    constructor(){

        console.error('initTagsEvent');

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

            console.log(this.tags);

            const idByTags     = getIdByTags(this.tags)      
            const uniqueID     = getUniqueID(idByTags)  
            console.log(uniqueID);     
            const validID      = sortIdInAllArray(idByTags,uniqueID)
            console.log(validID);
           

            if(validID.length > 0){

                const recipesByID  =  getData.getRecipeByID(validID);
                delRecipes() 
                showRecipesByID(recipesByID)
                
                //MAJLISITNG + suppr TArget
                
                majListing(recipesByID)
                
                //On réinitilise le clique dans les nouveaux listing
                init.options.forEach(O =>{  new ListingEvent(O)  })
                const delThisValueOnLinsting = target.dataset.value
                removeTagInListing(delThisValueOnLinsting)
    
    
            }else{    
              showMessage('error','Aucun résultat')    
            }

        }else{
            delRecipes()           
            const init = new Init
        }

     

    }

   


}