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
    tmp.forEach((el) => {
      if (!result.includes(el.value)) {
        result.push(el.value);
      }
    });

    console.log(tmp);
    console.log(result);

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
      new listing(result, options)
    );
    renderComponent(thisListing, targetLabel);
    targetLabel.setAttribute("data-status", "openSuggestion");
    new EventsDispatcher('[data-js="getTag"]');
  }

  //Récupère les ID des recettes en fonction des tag et la recherche ciblé avec les input
  getTagData(target) {
    console.log(target);

    const allElems = [];
    let tmp = [];
    const tags = document.querySelectorAll(".filterResult [data-tag]"); //On list les tags Existants

    //Ajoute tout les tag présent dans la page à l'intérieur du tableau.
    if (tags.length > 0) {  tags.forEach((el) => allElems.push(el)); }

    // On adjoint l'élément sur lequel client à cliquer
    allElems.push(target);

    //Récupère tous les ID et valeur Liés au tag présent et au lien cliqué
    allElems.forEach((els) => {

      const options = els.dataset;
      options.search = els.dataset.value;

      tmp.push(getResultToRootAndLowerLevel(options))

    });

    this.checkResultTag(tmp);

    console.log(tmp);
  }

  checkResultTag(thisData){

    const result = [];


    // Créer une liste des ID unique en supprimant les doublons
    // Le tableau obtenue serviras de control pour trouver les recettes liés à la recherche
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!result.includes(value.idRecipe)) {
             result.push(value.idRecipe);
        }
      });
    });

    let limit = thisData.length;
    let idUniqueForThisSearch = [];

    /**
     *
     * @param {*} thisData
     * @param {*} limit
     * @param {*} count
     * @param {*} checkArray
     * @param {*} otherCheck
     */
    // Fait le trie, afin de ne conserver que les ID présentes dans tout les tableaux lié à un mots clef de la recherche
    // Ex : 4 Tableau pour 4 mots clef , ne que garde que les ID présentes dans les 4 tableaux
    const getIdPresentedInAllArray = (
      data,
      limit,
      count,
      checkArray,
      otherCheck = []
    ) => {
      data[count].forEach((el) => {
        checkArray.forEach((idControl) => {
          if (el.idRecipe === idControl) {
            if (!otherCheck.toString().includes(el.idRecipe.toString())) {
              otherCheck.push(el.idRecipe);
            }
          }
        });
      });

      count++;
      if (count < limit) {
        getIdPresentedInAllArray(data, limit, count, otherCheck);
      } else {
        idUniqueForThisSearch = otherCheck;
      }
    };

    getIdPresentedInAllArray(thisData, limit, 0, result);

    if (idUniqueForThisSearch.length > 0) {
      //On récupère les recettes avant affichage
      const recipeSearch = getData.getRecipeByID(idUniqueForThisSearch);
      //On supprime les recettes précement affichés
      if (document.querySelectorAll(".sticker").length > 0) {
        let removethis = document.querySelectorAll(".sticker");
        removethis.forEach((el) => {
          el.remove();
        });
      }

      const recipesComponent = makeComponent(new createRecipe(recipeSearch));
      const targetRenderRecipes = document.querySelector(".mainWrapper");
      renderComponent(recipesComponent, targetRenderRecipes);
    } else {
      //On affiche un message d'erreur, indiquant qu'aucun résultat n'as été trouvé
    }
  };

}