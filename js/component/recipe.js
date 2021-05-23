class createRecipe{



    constructor(thisData){
    

    this.elHTML = '<section class="mainWrapper">'
    let styleDelay =0

    console.log(thisData);

        thisData.forEach(data => {

            console.log(data.id);

            this.elHTML += 
                `<article class="sticker" data-id="${data.id}" style="animation-delay:${styleDelay}ms;">
                    <p class="flexImg"></p>
                <article>
                <header>
                    <h2>${data.name}</h2>
                    <p class="timer"><i class="far fa-clock"></i>${data.time} min
                </header>
                <footer>
                    <ul class="listing">`


        data.ingredients.forEach(ing=>{

            this.elHTML += `<li><span class="textSmall textBold">${ing.ingredient}`
        if(ing.quantity){
            this.elHTML +=`:<span><span class="textSmall"> ${ing.quantity}`
        }
        if(ing.unit){
            this.elHTML += ` ${ing.unit}</span>`
        }
            this.elHTML +=`</li>`

        })

        this.elHTML += `</ul>
                        <div class="multiLine__ellipsis">
                            <p class="textSmall ">${data.description}</p>
                        </div>
                        </footer>
                    </article>
                </article>`

        styleDelay=styleDelay+200

        });

        this.elHTML += `</section>`
    }
}