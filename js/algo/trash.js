/*
On refabriques des tabelau plus simples
a manipuler


*/


const data = 'Coco';
const search = data.toLocaleLowerCase();
const regex = new RegExp(`${search}`);
console.error(regex);


const getThisIngredientsSearch = (recipes,search) => {


    let getThisIngredient = {}

/*
    recipes.forEach((recipe)=>{

        recipe.ingredients.forEach((ing)=>{

            console.log(ing.ingredient);

            if(ing.includes('coco')){
                console.error('yolo');
                return false;
            }


        })



    })

*/

    for (const [id, rootObject] of Object.entries(data)) {

        console.log(`id de la recette: ${id}` );

        for (const [ingId, ing] of Object.entries(rootObject)) {

            console.log(ing);    
          /*  if(ing.ingredient.include('coco')){
                console.log('yolo');
            }*/

        }
    }

/*
        Object(data).forEach( (root,index) => {

                console.log(root);// ing in recipes
                console.log(index);// index of recipes

                Object(root.ingredients).forEach((el,i) => {

                    console.log(el);// ing in recipes
                    console.log(i);// index of recipes

                    if(el.includes('coco')){
                        console.log('yolo');
                    }
    
    
            })


        })
*/



}



getThisIngredientsSearch(recipes,search)

/*

const getAllIngredients = () => {
    let ingredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ingredients.includes(ing.ingredient.toLowerCase()))
          ingredients.push(ing.ingredient.toLowerCase());
      });
    });
    return ingredients.map((ing) => ({
      type: "ing",
      name: ing,
    }));
  };

console.log(getAllIngredients());
  */



const forOf = (data,search) => {

    let forOfIngredient = {};
    let i = 0;
    for (const [id, rootObject] of Object.entries(data)) {       
         for (const [recipesId, ing] of Object.entries(rootObject.ingredients)){ 

            if(ing.ingredient.toLowerCase().includes(search.toLowerCase())){
                forOfIngredient[i++] = {idRecipe : id, ing: ing.ingredient} ; 

                        // Soit dès le premier Match on break (évites les doublons);
                break; // Soit on récupère tous les ingrédients qui Match 
            }
        }
    }

 return forOfIngredient;
};

const forOfResult = forOf(recipes,search);
console.log(forOfResult);





let idGlobal = Object.assign({},resultIng,resultName, resultApp, resultDesc, resultUst);
console.log(idGlobal);

let merged = {...resultIng,...resultName,...resultApp,...resultDesc,...resultUst}
console.log(merged);