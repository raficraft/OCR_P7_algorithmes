/** * 
 * @param {string} str 
 * @returns Une chaine des caratère sans accent
 */

 const normalizeString = (str) =>{
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
 }
