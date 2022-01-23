class createTags {
  constructor(tagsData) {


    this.elHTML = ` <P class="filterTag filterTag--blue color--${tagsData.context}" 
          data-tag data-context="${tagsData.context}" data-fields="${tagsData.fields}" data-depth="${tagsData.depth}" data-value="${tagsData.value}">
          ${tagsData.value}
          <i class="far fa-times-circle" data-js="delParent" ></i></p>`;

  }

}
