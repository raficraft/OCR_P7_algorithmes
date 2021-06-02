const checkResultKeyWords = (search) => {

  let checkSearch  = false
  init.globalOptions.forEach(O => {

  O.search = search
  const result  = getData.specificData(O) 

  if(checkSearch === false){
    if(result.length > 0 ){
      checkSearch = true
    }
  }
  });  
  return checkSearch
}



/**
 * Contient tout les resultas 
 * qui match  dans les recettes 
 * et conserve les valeurs unique * 
 * @param {object} thisData 
 * @returns {array} resultat unique 
 */

 const sortSuggestion = (thisData) => {
  
    let result =[]
    thisData.forEach((el) => {
      if (!result.includes(el.value)) {
        result.push(el.value);
      }
    });
  
    return result
  }


  getIdByHashJson = (keyWords) => {

  }

  
  /**
   * Recheche les ID des recettes par mots clef
   * Renvoie un Tableau d'object contenant les resultat obtenue
   * sur les 3 champs de la recherche global
   * {name , description, ingredients} * 
   * @param {string} keyWords 
   * @returns {array} 
   */
  
  const idByGlobalSearch = (keyWords) => {
  
    const idByGlobal = []  
  
      keyWords.forEach(search => {
  
        // Verifie en amont si le mot clef Demandé renvoie
        // au moins des resultat non null dans un des champs de
        // recherche [name, ingredients, description]
        const validSearch = checkResultKeyWords(normalizeString(search))
  
        init.globalOptions.forEach(O => {
  
          O.search = normalizeString(search)
          const result  = getData.specificData(O)  

          console.error('  ?????????? ', result);
  
          if(validSearch === true && !stopwords.includes(search)){
  
            idByGlobal.push(result); 
  
          }else{
  
            //On supprime du champ de recherche, le mot clef qui ne renvoie pas de résultat {optionnel} 
            thisInput = document.querySelector('.search input')
            const str = thisInput.value
            thisInput.value = str.replace(`${search}` , '')
  
          }
  
        });  
  
      });

      console.log(idByGlobal);

      console.log(idByGlobal);

    return idByGlobal
  
  }
  /**
   * Recherche les ID des recettes correspondant au tags 
   * restant à l'écran
   * @param {*} tags 
   * @returns 
   */
  
  const getIdByTags = (tags) => {
  
    const idByTags = []
  
    if(document.querySelector('.search input').value !==''){
      idByTags.push(idByGlobalSearch(document.querySelector('.search input').value))
    }
  
    tags.forEach((tag)=>{
  
        const options = tag.dataset
        options.search = tag.dataset.value
        idByTags.push(getData.specificData(options))
    })
  
    return idByTags
  
  }
  
  /**
   * Renvoie les ID des recettes en fonction de l'élement HTML 
   * séléctionné dans les listings
   * @param {HTMLElement} target 
   * @returns // Tableau associatif
   */
  
  const getIdBykeyWord = (target) => {
            
    let idBykeywords = []
  
    let allElems = []
    allElems.push(target)
  
  
    const tags = document.querySelectorAll(".filterResult [data-tag]");
  
  
    if (tags.length > 0) {  tags.forEach((el) => allElems.push(el)); }
  
    allElems.forEach((els) => {
  
        const options = els.dataset;
        options.search = els.dataset.value;
        idBykeywords.push(getData.specificData(options))  
    });
    
   return idBykeywords
  }

  
  /**
   * Trie les ID des différents tableaux de resultat {getIdBy...}
   * pour ne conserver que les ID unique et obtenir un
   * tableau de comparaison. [refactoring voir new set à utiliser en amont ??]
   * @param {*} thisData 
   * @returns 
   */
  
  const getUniqueID = (thisData) => {  

    comparaisonChart = []
  
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!comparaisonChart.includes(value.id)) {
            comparaisonChart.push(value.id);
        }
      });
    });
    return comparaisonChart  
  }
  
  /**
   * Fonction récursive qui compare tout 
   * les tableaux de résultat et ne garde
   * que ceux présent dans chacun des tableaux
   * par apport à un tableau de comparaison {fn.getUniqueID}
   * 
   * @param {object} idByKeyWords 
   * @param {array} comparaisonChart 
   * @returns 
   */
  
  const sortIdInAllArray = (idByKeyWords,comparaisonChart) => {
  
    const sortId = (
      idByKeyWords,
      limit,
      count,
      comparaisonChart,
      idValid = []
    ) => {
  
      idByKeyWords[count].forEach((el) => {
        comparaisonChart.forEach((idControl) => {
          if (el.id === idControl) {
            if (!idValid.toString().includes(el.id.toString())) {
              idValid.push(el.id);
            }
          }
        });
      });
  
      count++;
      if (count === limit) {
        return idValid;
      } else if (count < limit) {
        comparaisonChart = idValid;
        return sortId(idByKeyWords, limit, count, comparaisonChart);
        //return sortId(idByKeyWords, limit, count, idValid); ???
      }
    };
  
    const limit = idByKeyWords.length
    let IDresult = sortId(idByKeyWords,limit,0,comparaisonChart)
  
    return IDresult
  }


  const getUniqueIdWithFilterResult = (thisData) =>{  

    comparaisonChart = []
    console.log(thisData);
  
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!comparaisonChart.includes(value.id)) {
            comparaisonChart.push(value.id);
        }
      });
    });
    return comparaisonChart  
  }