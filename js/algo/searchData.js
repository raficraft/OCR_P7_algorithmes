class SearchData {
  //Obtenir une suggestion dans les onglets dédié

  getSuggestion(target) {
    let result = [];
    let tmp = [];

    const search = target.value;
    const context = target.dataset.context;
    const fields = target.dataset.fields;
    const depth = target.dataset.depth;

    const targetLabel = document.querySelector(`#inputTrigger--${context}`);

    switch (depth) {
      case "lowerLevel":
        tmp = getData.specificDataLowerLevel(search, fields, context);
        break;
      case "root":
        tmp = getData.specificDataRoot(search, fields);
        break;
    }

    tmp.forEach((el) => {
      if (!result.includes(el.value)) {
        result.push(el.value);
      }
    });

    const allList = document.querySelectorAll(".inputList");

    if (allList.length > 0) {
      document.querySelector(".inputList").remove();
      resetOtherInput(targetLabel);
    }

    if (
      targetLabel.getAttribute("data-status") === "openList" &&
      result.length > 0
    ) {
      targetLabel.setAttribute("data-status", "openSuggestion");
    }

    const thisListing = makeComponent(
      new listing(result, context, fields, depth)
    );
    renderComponent(thisListing, targetLabel);
    targetLabel.setAttribute("data-status", "openSuggestion");
    new EventsDispatcher('[data-js="getTag"]');
  }

  //Récupère les ID des recettes en fonction des tag et la recherche cilbé avec les input

  getTag(target) {
    const label = target.closest(".inputTrigger");
    const input = label.firstElementChild;

    const multiSearch = [];
    const allElems = [];
    const tmp = [];
    let allSearch = [];

    allElems.push(target);

    //On list les tags Existants

    const tag = document.querySelectorAll(".filterResult [data-tag]");
    if (tag.length > 0) {
      tag.forEach((el) => allElems.push(el));
    }

    // console.log(tag);
    // console.log(allElems);

    allElems.forEach((els) => {
      // console.log(els.dataset);

      const depth = els.dataset.depth;
      const context = els.dataset.context;
      const fields = els.dataset.fields;
      const search = els.dataset.value;

      switch (depth) {
        case "lowerLevel":
          tmp.push(getData.specificDataLowerLevel(search, fields, context));
          break;
        case "root":
          tmp.push(getData.specificDataRoot(search, fields));
          break;
      }
    });

    checkResultTag(tmp);
  }
}

const checkResultTag = (thisData) => {
  const result = [];

  // console.log(thisData);

  thisData.forEach((data) => {
    // console.log(data);

    data.forEach((value) => {
      if (!result.includes(value.idRecipe)) {
        result.push(value.idRecipe);
      }
    });
  });
  console.log(result);
  console.log(thisData);

  let limit = thisData.length;
  let idUniqueForThisSearch = [];

  const checkThisShit = (
    thisData,
    limit,
    count,
    checkArray,
    otherCheck = []
  ) => {
    thisData[count].forEach((el) => {
      checkArray.forEach((idControl) => {
        //console.log(`on verifie l'égalité entre cette valeur : ${el.idRecipe} est celle ci :${idControl}`);

        if (el.idRecipe === idControl) {
          if (!otherCheck.toString().includes(el.idRecipe.toString())) {
            otherCheck.push(el.idRecipe);
          }
        }
      });
    });

    count++;
    if (count < limit) {
      checkThisShit(thisData, limit, count, otherCheck);
    } else {
      idUniqueForThisSearch = otherCheck;
    }
  };

  checkThisShit(thisData, limit, 0, result);

  console.log(idUniqueForThisSearch);
};
