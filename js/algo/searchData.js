


const data = 'Crème';
const search = normalizeString(data)

// Culture G , injection de variable dans une regex
// {const regex = new RegExp(`ReGeX${testVar}ReGeX`);} le flag passe en second paramètres
const regex = new RegExp(`${ normalizeString(data)}`,'g');

/**/

const searchIngredients  = (data,search) =>{
    let searchResult = [];

    let i = 0;
    data.forEach((recipe,key) => {
      recipe.ingredients.forEach((ing) => {
            if(normalizeString(ing.ingredient).includes(search)){
                searchResult[i++] = {idRecipe : key, ing: ing.ingredient} ;
            }
       })        
    })

  return searchResult;
}
const searchIngredientsResult= searchIngredients(recipes,search)

console.log(searchIngredientsResult)

/**/

const searchUstensils  = (data,search) =>{
    let searchResult = [];

    let i = 0;
    data.forEach((recipe,key) => {
        recipe.ustensils.forEach((ust) => {

            if(normalizeString(ust).includes(search)){                
                searchResult[i++] = {idRecipe : key, ust: ust } ;
            }
        })           
    })

  return searchResult
}
const searchUstensilsResult= searchUstensils(recipes,search)

console.log(searchUstensilsResult)


/**/

const searchName  = (data,search) =>{
    let searchResult = [];

    let i = 0;
    data.forEach((recipe,key) => {

        if(normalizeString(recipe.name).includes(search.toLowerCase())){
            searchResult[i++] = {idRecipe : key, name: recipe.name} ;
        }
           
    })

  return searchResult
}
const searchNameResult= searchName(recipes,search)

console.log(searchNameResult)

/**/

const searchDescription  = (data,search) =>{
    let searchResult = [];

    let i = 0;
    data.forEach((recipe,key) => {

        if(normalizeString(recipe.description).includes(search)){
            searchResult[i++] = {idRecipe : key, desc: recipe.description} ;
        }           
    })

  return searchResult
}
const searchDescResult= searchDescription(recipes,search)

console.log(searchDescResult)

/**/

const searchAppliance  = (data,search) =>{
    let searchResult = [];

    let i = 0;
    data.forEach((recipe,key) => {

        if(normalizeString(recipe.appliance).includes(search)){
            searchResult[i++] = {idRecipe : key, app: recipe.appliance} ;
        }           
    })

  return searchResult
}
const searchAppResult= searchAppliance(recipes,search)

console.log(searchAppResult)

















