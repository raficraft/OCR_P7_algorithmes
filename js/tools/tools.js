/** * 
 * @param {string} str 
 * @returns Une chaine de caratère standart
 */



 const normalizeString = (str) =>{

    if(typeof(str) === 'number'){
        str = str.toString()
    }

    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
 }


 /**
 * Met le premier caractère d'une chaine en majuscule
 * @param {string}
 */

 const ucFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Obtiens la dimension d'un objet 
 * @param {objet} obj 
 */
Object.size = (obj) => {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * Verifie que le valeur passé en argument est un multiple de 2
 * @param {number} value
 */

const isEven = value => {
	if (value%2 == 0)
		return true;
	else
		return false;
}

/**
 * Verifie que le valeur passé en argument est un multiple de 2
 * @param {number} value
 */

const multipleOfThree = value => {
	if (value%3 == 0)
		return true;
	else
		return false;
}

/**
 * 
 * @param {string} goTo  
 */

const redirectTo = (goTo)=>{
	document.location.href=goTo;
}

/**
 * Permute un élément avec le premier enfant du parent
 * NB : Possibilité de l'amérioler:
 *  -Permutté deux éléments qu'elle que soit leur position
 *  -Permuté les éléments adjacents {previousSibling || nextSibling}
 * @param {HTMLElement} elem 
 */

function swapElement(elem) {
    elem.parentNode.insertBefore(elem, elem.parentNode.firstChild);
  }

/**
 * Permet de modofier plusieurs attribut en une seul requête
 * @param {HTMLElement} el //Element ciblé
 * @param {objet} options  // Collections d'attributs à appliqué
 */

const setAttributes = (el, options) => {
	Object.keys(options).forEach(function(attr) {
	  el.setAttribute(attr, options[attr]);
	})
 }




/**
 * Permet de masquer la scroll lors de
 * l'affichage d'une boite de dialog 
 * prenant toute la surface de l'écran
 */
 const hiddenScrollBar= () => {
	let htmlElt = document.documentElement
    let bodyElt = document.body
    //Enlève la scrollbar lors de l'ouverture du carousel.
    htmlElt.scrollTop = 0;
    bodyElt.scrollTop = 0;
    bodyElt.style.overflow = "hidden"
}

/**
 * Restore la barre de scroll
 */

const restoreScrollBar = () => {
	let bodyElt = document.body
        bodyElt.style.overflow = "scroll";
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} attributes 
 * @param {string} oldAttr 
 * @param {string} newAttr 
 */

const toggleAttribute = (element,attributes,oldAttr,newAttr) =>{

	if(element.getAttribute(attributes) === oldAttr){
		element.setAttribute(attributes, newAttr)
	}else if(element.getAttribute(attributes) === newAttr){
		element.setAttribute(attributes, oldAttr)
	}
}




/*Empeche la function passé en callBack 
  de se déclenché à chaque event dans un certain.
   Elle ne ce déclenchera que si le délay passé et 
   supérieur entre deux event de même nature
*/

debounce = (callback, delay) => {
    let timer;
    return function(){
        let args = arguments;
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, delay)
    }
}


/*Limite le nombre d'appel à une fonction à laps de temps restreint*/
function throttle(callback, delay) {
  let last;
  let timer;
  return function () {
      let context = this;
      let now = +new Date();
      let args = arguments;
      if (last && now < last + delay) {
          // le délai n'est pas écoulé on reset le timer
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              callback.apply(context, args);
          }, delay);
      } else {
          last = now;
          callback.apply(context, args);
      }
  };
}



const elementDistribution = (container,el,count) =>{

      // Redifinie le style des éléments contenue dans une container 
      // Parent quand leur nombre est inférieur à une valeur attendue {count}

      const thisEl = document.querySelectorAll(el)
      const size = thisEl.length      
      const thisParent = document.querySelector(container)


      this.multipleOf = (value ,count)=>{

          if (value%count == 0)
            return true;
          else
            return false;      
      } 

     

      if(this.multipleOf(size,count) === false || thisEl.length === 1){

          if(!thisParent.classList.contains('orderContent__center')){
              thisParent.classList.add('orderContent__center')
          }

          for(let i = 0; i < size; i++){
              thisEl[i].style.marginLeft  = '2rem'
              thisEl[i].style.marginRight  = '2rem'
          }
      }else{

          if(thisParent.classList.contains('orderContent__center')){
              thisParent.classList.remove('orderContent__center')
          }

      }
}


