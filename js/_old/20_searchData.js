class SearchData {

  //Obtenir une suggestion dans les onglets dédié
  getSuggestion(target) {
    let result = [];
    let tmp = [];
    const options        = target.dataset
          options.search = target.value
    const targetLabel = document.querySelector(`#inputTrigger--${options.context}`);

    //Récupère tout les ID et valeur liés à la recherche 
    tmp = getResultToRootAndLowerLevel(options)

    //Trie les Valeur unique pour afficher la suggestion
   


    const allListTag = document.querySelectorAll(".inputList");

    if (allListTag.length > 0) { 
      document.querySelector(".inputList").remove();
      resetOtherInput(targetLabel);
    }

    if (targetLabel.getAttribute("data-status") === "openList" &&
        result.length > 0) {
      targetLabel.setAttribute("data-status", "openSuggestion");
    }

    // on affiche le listing
    const thisListing = makeComponent(
      new createListing(result, options)
    );
    renderComponent(thisListing, targetLabel);
    targetLabel.setAttribute("data-status", "openSuggestion");
    new EventsDispatcher('[data-js="getTag"]');
  }



  //Récupère les ID des recettes en fonction des tags et la recherche ciblé avec les input
  getTagData(target) {

    const options  = target.dataset;
    options.search = target.value;
    const result = [];      
    const allElems = [];
    let thisData = [];
    const tags = document.querySelectorAll(".filterResult [data-tag]"); //On list les tags Existants


    //Ajoute si présent, tout les tag l'intérieur du tableau {allElems}.
    if (tags.length > 0) {  tags.forEach((el) => allElems.push(el)); }

    // On adjoint l'élément sur lequel l'utilisateur à cliquer
    allElems.push(target);
    //Récupère tous les ID et valeur Liés au tableau {allElems} Write function
    allElems.forEach((els) => {

      const options = els.dataset;
      options.search = els.dataset.value;
      thisData.push(getResultToRootAndLowerLevel(options))

    });

    // Créer une liste des ID unique en supprimant les doublons
    // Le tableau obtenue serviras de control pour trouver les recettes liés à la recherche // WRITE function
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!result.includes(value.idRecipe)) {
             result.push(value.idRecipe);
        }
      });
    });

    let limit = thisData.length;

    //On trie les id unique
    let idUniqueForThisSearch =  getIdPresentedInAllArray(thisData, limit, 0, result);


    if(idUniqueForThisSearch.length > 0) {

      showValidTags(options)

      //On récupère les recettes avant affichage
      const recipeSearch = getData.getRecipeByID(idUniqueForThisSearch);
      //On supprime les recettes précement affichés
      if (document.querySelectorAll(".sticker").length > 0) {
        let removethis = document.querySelectorAll(".sticker");
        removethis.forEach((el) => {
          el.remove();
        });
      }  

      //on met à jour les diiférents listing
      const dataElement = document.querySelectorAll(".inputTrigger input");
      showListingForThisSearch(dataElement, recipeSearch);

      const recipesComponent = makeComponent(new createRecipe(recipeSearch));
      const targetRenderRecipes = document.querySelector(".mainWrapper");
      renderComponent(recipesComponent, targetRenderRecipes);


    } else {
      //On affiche un message d'erreur, indiquant qu'aucun résultat n'as été trouvé
    }
  };

}