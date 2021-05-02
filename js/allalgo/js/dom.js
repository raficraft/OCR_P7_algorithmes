class GetResult{

    constructor(){

        this.inputSearch = document.querySelector('input[name="search"]')
        this.input = document.querySelectorAll('input[data-js="search"]')
      
        this.inputSearch.addEventListener('keyup',debounce((e)=>{             
            this.findResult()
        },300))  
       
    }

    findResult(){

        const keyword = this.inputSearch.value
       
        const operations = 1

        /**Algorithme V4   recursiveReadJson */
        
        let t0 = performance.now();
        for(let i = 0; i < operations; i++){       
        algoRecursive(keyword)
        }
        let t1 = performance.now();
        let timing = t1 - t0

        console.log(timing);

       /* let finalResult = algoBasique(keyword)

        let resultTarget = document.querySelector('.resultV4 .resultText')
        resultTarget.innerHTML = `Durée d'éxécution pour ${operations} opérations: ${timing} ms`
        let resultCount = document.querySelector('.resultV4 .resultCount')
        resultCount.innerHTML = `Nombre de résultat : ${finalResult.length} recettes trouvés`*/



        /**Algorithme V5   magic String */
       
        const keyWordsArray = keyword.trim().replace(/  +/g, ' ').split(' ') 

    /*    t0 = performance.now();
        for(let i = 0; i < operations; i++){
       // algoBasique(keyWords)
        const resultV5 = getData.algoV5(keyWordsArray)
        const uniqueIDV5 = getUniqueIDinSingleLoop(resultV5)
        const finalResult = getData.getRecipeByID(uniqueIDV5)
        }
        t1 = performance.now();
        timing = t1 - t0

        const resultV5 = getData.algoV5(keyWordsArray)
        const uniqueIDV5 = getUniqueIDinSingleLoop(resultV5)
              finalResult = getData.getRecipeByID(uniqueIDV5)

        resultTarget = document.querySelector('.resultV5 .resultText')
        resultTarget.innerHTML = `Durée d'éxécution pour ${operations} opérations: ${timing} ms`
        resultCount = document.querySelector('.resultV5 .resultCount')
        resultCount.innerHTML = `Nombre de résultat : ${finalResult.length} recettes trouvés` */     

    }
}

const getResult = new GetResult()