class ListingEvent{



    constructor(options){


        this.options = options
        this.rootElement = document.querySelector(`#inputTrigger--${options.context}`) //Label
        this.input = document.querySelector(`#inputTrigger--${options.context} [data-js="search"]`) //Input        
        this.listing = document.querySelector(`#inputList--${options.context}`) //Listing 
        this.tagsLink = document.querySelectorAll(`#inputList--${options.context} [data-js="getTag"]`)       
       
        this.arrowOpen = document.querySelector(`#inputTrigger--${options.context} [data-js="openListing"]`)
        this.arrowClose = document.querySelector(`#inputTrigger--${options.context} [data-js="closeListing"]`)

        this.allInput = document.querySelectorAll(`.inputTrigger input`) //Input


        //EVENT

        this.arrowOpen.addEventListener('click',(e) => {
            
            e.preventDefault();   e.stopPropagation();
            console.log('click');
            this.openListing()
        })

        this.arrowClose.addEventListener('click',(e) => {
            console.log('click');
            e.preventDefault();   e.stopPropagation();
            this.closeListing()
        })

        this.tagsLink.forEach((tags) =>  tags.addEventListener("click", (e) => {      
            e.preventDefault();   e.stopPropagation();         
            this.getTag(e.target)            
        }));        

        this.input.addEventListener('click',(e)=>{ e.preventDefault();   e.stopPropagation(); this.resetInput() })

        this.input.addEventListener('keyup',debounce((e)=>{

            e.preventDefault()

            const target = e.target
            if(target.value.length > 2){
                this.options.search = target.value  
                console.log(target.value);             
                this.getSuggestion()
            }else if(target.value.length === 0){
                this.rootElement.setAttribute("data-status", "close"); 
                init.renderListing()
            }
        },300))
    }


    //Method
    
    openListing(){

        this.closeListing();      
        this.input.setAttribute("placeholder", `Rechercher un ${this.options.context}`);
        this.rootElement.setAttribute("data-status", "openList");     
      
    }
    
    closeListing(){
      
        const thisOpen = document.querySelector('[data-status="openList"]')
      
        if (document.querySelectorAll(".inputList").length > 0) {         
        this.resetInput()
        //init.renderListing()
        }
    
        if(thisOpen){  
    
            const childOfOpen = thisOpen.firstElementChild; //#text->input
            const placeHolder = childOfOpen.dataset.placeholder;
    
            childOfOpen.setAttribute("placeHolder", placeHolder);
            thisOpen.setAttribute("data-status", "close");

        }
      
    }

    resetInput(){

        const triggerOpen = document.querySelectorAll(`.inputTrigger[data-status]`); 
        
        triggerOpen.forEach(triggerOpen => {

            if(triggerOpen){

            const inputOfOpen = triggerOpen.firstElementChild; //input
            const placeHolder = inputOfOpen.dataset.placeholder;

            inputOfOpen.value = "";
            inputOfOpen.setAttribute("placeHolder", placeHolder);
            triggerOpen.setAttribute("data-status", "close");

            }
            
        });
    }

    getSuggestion(){

        const dataSuggestion = getData.specificData(this.options)
        if(dataSuggestion){
        const sortData = sortSuggestion(dataSuggestion)
        //affichage des données trier
        this.listing.remove()
        

            if(this.rootElement.dataset.status === 'close' || this.rootElement.dataset.status === 'openSuggestion'){
                this.rootElement.setAttribute("data-status", "openSuggestion");
                const listingComponent = makeComponent(new createListing(sortData,this.options));
                renderComponent(listingComponent, this.rootElement);

                init.options.forEach(O=>{
                    new ListingEvent(O)
                })            
            }
        }
    }

    getTag(target){ 
        
        
        if(this.rootElement.dataset.status !== 'openList'){
            this.rootElement.dataset.status = 'openList'
        }

        /*Algorithme*/

        console.log(target);
        const idByKeywords = getIdBykeyWord(target)
        const uniqueID     = getUniqueID(idByKeywords)  
        const validID      = sortIdInAllArray(idByKeywords,uniqueID)
        

        /*Traitements de l'affichage*/
        if(validID.length > 0){

            const recipesByID  =  getData.getRecipeByID(validID); 
            delRecipes() 
            showRecipesByID(recipesByID)
            
            //MAJLISITNG + suppr l'élement cliqué du listing

            majListing(recipesByID)
            
            //On réinitilise le clique dans les nouveaux listing
            init.options.forEach(O =>{  new ListingEvent(O)  })
            showValidTags(target)

            const delThisValueOnLinsting = target.dataset.value
            removeTagInListing(delThisValueOnLinsting)

            new TagsEvent()

            if(validID.length === 1){


                init.options.forEach(O => {
                this.listing = document.querySelector(`#inputList--${O.context}`)           
                this.listing.remove()
                });

                closeListing()
                //disableInput()
            }
            
        }else{
            showMessage('error','Aucun résultat avec ce filtre') 
        }

    }
}




window.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
     console.error('RESET'); window.listingEvent.resetInput(); 
});