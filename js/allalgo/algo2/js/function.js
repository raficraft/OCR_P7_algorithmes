/** * 
 * @param {string} str 
 * @returns Une chaine de caratère standart
 */
 const normalizeString = (str) =>{

    return str
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/*Empeche la function passé en callBack 
  de se déclenché à chaque event dans un certain délai.
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