class GetResult{

    constructor(){

        this.inputSearch = document.querySelector('input[name="search"]')
        this.input = document.querySelectorAll('input[data-js="search"]')
      
        this.inputSearch.addEventListener('keyup',debounce((e)=>{             
            this.findResult()
        },300))  
       
    }

    findResult(){

        const keyWords = this.inputSearch.value
        const operations = 26000   

        const t0 = performance.now();
        for(let i = 0; i < operations; i++){
        algoBasique(keyWords)
        }
        const t1 = performance.now();
        const timing = t1 - t0

        const finalResult = algoBasique(keyWords)

        const resultTarget = document.querySelector('.resultText')
        resultTarget.innerHTML = `Durée d'éxécution pour ${operations} opérations: ${timing} ms`
        const resultCount = document.querySelector('.resultCount')
        resultCount.innerHTML = `Nombre de résultat : ${finalResult.length} recettes trouvés`        

    }
}

const getResult = new GetResult()