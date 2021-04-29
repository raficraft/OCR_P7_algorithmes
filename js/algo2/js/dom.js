class GetResult{

    constructor(){

        this.inputSearch = document.querySelector('input[name="search"]')
        this.inputOperations = document.querySelector('input[name="nbInstructions"]')
        this.input = document.querySelectorAll('input[data-js="search"]')

        this.input.forEach(input => {
            input.addEventListener('keyup',debounce((e)=>{             
                this.findResult()
            },300))            
        });

       


       
    }

    findResult(){

        const keyWords = this.inputSearch.value
        let operations =   this.inputOperations.value

        if(!this.inputOperations.value){
           operations = 2000
        }

        const t0 = performance.now();
        for(let i = 0; i < operations; i++){
        algoBasique(keyWords)
        }
        const t1 = performance.now();
        const timing = t1 - t0

        const finalResult = algoBasique(keyWords)

        const resultTarget = document.querySelector('.resultText')
        resultTarget.innerHTML = `Durée d'éxécution pour ${operations} : ${timing} ms`
        const resultCount = document.querySelector('.resultCount')
        resultCount.innerHTML = `Nombre de résultat : ${finalResult.length} recettes trouvés`
        
        

    }

}

const getResult = new GetResult()