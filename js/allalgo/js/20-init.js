class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes

      this.globalOptions = [
        {context : 'name', fields : 'name'},
        {context : 'ingredients', fields : 'ingredient'},
        {context : 'description', fields : 'description' }
    ]          
    } 
}


const init = new Init()

