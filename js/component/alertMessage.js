class CreateAlertMessage{

    constructor(type,message){

            this.elHTML = 
            `<div id="alertMessage--${type}" class="alertMessage alertMessage--${type}">
                <p>${message}</p>
                <i class="far fa-times-circle"></i>
            </div>`
    }
}