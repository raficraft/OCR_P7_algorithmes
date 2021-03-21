class EventsDispatcher {
  constructor(dataAttibute) {
    this.events = document.querySelectorAll(dataAttibute);
    this.events.forEach((btn) =>  btn.addEventListener("click", (e) => { this.eventClick(e);}));
    this.events.forEach((btn) =>  btn.addEventListener("keyup", (e) => { this.eventKeyUp(e);}));
  }

  eventClick(e) {
   // console.log(e);

    if (e.target.dataset.js) {

      const el = e.target;
      const target = e.target;
      const action = el.dataset.js;

      e.preventDefault();   e.stopPropagation();

      switch (action) {

        case "delParent":
          delParent(target);
        break;
        case "openListing":
          openListing(target);
        break;
        case "closeListing":
          closeListing();
        break;
        case "getTag":
            searchSpecific.getTag(target);
        break;
       

      }
    }
  }

  eventKeyUp(e) {

    if (e.target.dataset.js) {

      const el = e.target;
      const target = e.target;
      const action = el.dataset.js;
      const status = el.parentNode.dataset.status;

     // console.log(el);

      e.preventDefault();   e.stopPropagation();
      switch (action) {
        case "search":

          switch (status) {

            case "close":
            case "openSuggestion":
            case "openList":
              //Get Data
              if (target.value.length > 2) {
                searchSpecific.getSuggestion(target);
              } else if (target.value.length === 0) {

                if (document.querySelectorAll(".inputList").length > 0) {
                    document.querySelector(".inputList").remove();
                    target.setAttribute( "placeholder", "");
                }

                resetAllInput();

              }
              //ViewData

            break;            

            case "global":
              "";
            break;
          }
      }
    }
  }
}

new EventsDispatcher("[data-js]");
