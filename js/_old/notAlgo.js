

const data = 'lait';
const search = data.toLocaleLowerCase();
const regex = new RegExp(`${search}`);
let result = [];
console.error(regex);

//Recherche Global
// On cherche dans tous les champs de type string
// si correspondance
// On stocker l'id dans le tableau Result
// Et on passe à l'id suivant
// ensuite on fait de même pour les tableaux ingrédients et ustensible
//En fin de boucle l'on trie les ID unique.



// Ecriture basique , au vu de mes connaissance
// Résultats jsbenc.ch 2566/s 0.13% MDR
// Résultats obtenue sans la platanquer de console.log/error


for (const [id, rootObject] of Object.entries(recipes)) {
    console.error(`id de la recette ${id}`); 
    console.log(`l'objet {rootObject} contient chaque recette`);

    for (const [k, v] of Object.entries(rootObject)) {

        if(typeof(v) === 'string'){       

        console.log(`${k} : ${v}`);

        let verifString = v.toLowerCase().match(regex);

            if(verifString !== null){
                console.log(verifString);
                result.push(rootObject);
                break;
            }

        }//fin if typeof  === string
    
        if(typeof(v) === 'object'){
            console.log('on parcours cette object');

            for (const [k1, v1] of Object.entries(v)) {
               for (const [k2, v2] of Object.entries(v1)) {


                    if(k2 === 'ingredients' || k2 === 'ustensils'){
                
                        console.log(`${v2}`);
                        let verifObject = v2.toLocaleLowerCase().match(regex);

                        if(verifObject !== null){
                            console.log(verifObject);
                            result.push(rootObject);
                            break;
                        }
                    }
                }

            }
        }// fin de typeOf  === object
    }
}


console.error('Affichage des résultats');
console.log(result);
const uniqueResult = result.filter((x, i, a) => a.indexOf(x) == i);
console.log(uniqueResult);