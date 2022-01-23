class AlterateJson {
  constructor() {
    this.recipes = dataJSON;
    this.dictionnaryFields = [
      { context: "name", fields: "name", depth: "root" },
      { context: "ingredients", fields: "ingredient", depth: "lowerLevel" },
      { context: "appliance", fields: "appliance", depth: "root" },
      { context: "ustensils", fields: "ustensils", depth: "lowerlevel" },
    ];
    this.dictionnary = this.createDictionnary();
    this.flatData = this.flatJson(dataJSON);
    this.normalizeData = this.normalizeJson(dataJSON);
  }

  flatJson(JSON) {
    const result = [];

    this.dictionnaryFields.forEach((options) => {
      switch (options.depth) {
        case "root":
          JSON.forEach((recipe) => {
            if (!result[recipe.id]) {
              result[recipe.id] = [];
            }
            if (options.fields === "description") {
              const cleanEntries = this.removeStopWords(
                recipe[options.fields],
                this.dictionnary,
                "keep"
              );

              console.log(cleanEntries);
              result[recipe.id] += normalizeString(`${cleanEntries} `);
            } else {
              result[recipe.id] += normalizeString(
                `${recipe[options.fields]} `
              );
            }
          });

          break;

        case "lowerLevel":
          JSON.forEach((recipe) => {
            recipe[options.context].forEach((el) => {
              if (!result[recipe.id]) {
                result[recipe.id] = [];
              }

              result[recipe.id] += normalizeString(`${el[options.fields]} `);
            });
          });

          break;
      }
    });

    console.log(result);

    return result;
  }
  /**
   *
   * @returns
   */
  createDictionnary() {
    const dictionnary = [];

    this.recipes.forEach((recipe) => {
      const recipesKeys = Object.keys(recipe);

      recipesKeys.forEach((key) => {
        if (
          key === "name" ||
          key === "ingredients" ||
          key === "appliance" ||
          key === "ustensils"
        ) {
          if (typeof recipe[key] !== "object") {
            if (!dictionnary.includes(recipe[key])) {
              dictionnary.push(normalizeString(recipe[key]));
            }
          } else if (typeof recipe[key] === "object") {
            recipe[key].forEach((element) => {
              if (typeof element === "string") {
                if (!dictionnary.includes(element)) {
                  dictionnary.push(normalizeString(element));
                }
              } else {
                if (!dictionnary.includes(element["ingredient"])) {
                  dictionnary.push(normalizeString(element["ingredient"]));
                }
              }
            });
          }
        }
      });
    });

    return dictionnary;
  }

  /**
   *
   * @param {*} str
   * @param {*} dictionnary
   * @param {*} action
   * @returns
   */
  removeStopWords(str, dictionnary, action) {
    str = str.toString();
    const res = [];
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      let word_clean = words[i].split(".").join("");
      if (action === "remove") {
        if (!dictionnary.includes(word_clean)) {
          res.push(word_clean);
        }
      } else if (action === "keep") {
        if (dictionnary.includes(word_clean)) {
          res.push(word_clean);
        }
      }
    }
    return res.join(" ");
  }

  /*Enlève tout les accents des champs ciblé*/
  normalizeJson(JSON) {
    console.log("search");

    const newJSON = [];

    JSON.forEach((recipe, key) => {
      //  console.log(recipe);
      const thisKey = Object.keys(recipe);
      newJSON[key] = {};

      thisKey.forEach((fields) => {
        switch (typeof recipe[fields]) {
          case "string":
            newJSON[key][fields] = normalizeString(recipe[fields]);

            break;
          case "number":
            newJSON[key][fields] = recipe[fields];
            break;
          case "object":
            newJSON[key][fields] = [];

            recipe[fields].forEach((lowerLevel) => {
              switch (typeof lowerLevel) {
                case "string":
                  newJSON[key][fields].push(normalizeString(lowerLevel));

                  break;
                case "object":
                  const newEntries = {};

                  const lowerLevelKeys = Object.keys(lowerLevel);
                  lowerLevelKeys.forEach((thisKeys) => {
                    newEntries[thisKeys] = normalizeString(
                      lowerLevel[thisKeys]
                    );
                  });

                  newJSON[key][fields].push(newEntries);

                  break;
              }
            });

            break;
        }
      });
    });

    return newJSON;
  }
}

console.log("alterate");
const alterate = new AlterateJson();
