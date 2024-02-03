"use strict";
var onceInitDataShowDetailTripCb = function (e, tripToShow) {
    var imageDiv = document.querySelector('#imageDiv');
    var imageElement = document.createElement('img');
    imageElement.style.maxHeight = '350px';
    imageElement.alt = "trip-".concat(tripToShow.id, "-image");
    imageElement.src = tripToShow.image;
    imageDiv.append(imageElement);
    var textDiv = document.querySelector('#textDiv');
    var titleH1 = document.createElement('h1');
    titleH1.textContent = tripToShow.title;
    var destinationParagraph = document.createElement('p');
    destinationParagraph.id = 'tripDestination';
    destinationParagraph.textContent = tripToShow.destination;
    var priceParagraph = document.createElement('p');
    priceParagraph.id = 'tripPrice';
    priceParagraph.textContent = 'Starts from ' + tripToShow.price + '€/person';
    var shortDescriptionParagraph = document.createElement('p');
    shortDescriptionParagraph.id = 'tripShortDescription';
    shortDescriptionParagraph.textContent = tripToShow.shortDescription;
    var longDescriptionParagraph = document.createElement('p');
    longDescriptionParagraph.id = 'tripLongDescription';
    longDescriptionParagraph.textContent = tripToShow.longDescription;
    var buttonsDiv = document.createElement('div');
    var editBtn = document.createElement('button');
    var editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');
    editBtn.append(editIcon, ' Modify');
    editBtn.classList.add('btn', 'btn-outline-secondary', 'text-capitalize', 'm-2');
    editBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.ipcRendererCustom.sendAskShowEditTripForm(tripToShow.id);
    });
    var deleteBtn = document.createElement('button');
    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-regular', 'fa-trash-can');
    deleteBtn.append(deleteIcon, ' Delete');
    deleteBtn.classList.add('btn', 'btn-outline-secondary', 'text-capitalize');
    deleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.ipcRendererCustom.invokeRemoveTrip(tripToShow.id, function (response) {
            if (response.success) {
                var divMessage = document.querySelector('#response-message');
                divMessage.textContent = response.message;
                divMessage.hidden = false;
                divMessage.classList.remove('alert-success', 'alert-danger');
                response.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger');
                var divContainer = document.querySelector('.container');
                divContainer.style.position = 'absolute';
                divContainer.style.width = '100%';
                divContainer.style.height = '100%';
                divContainer.style.zIndex = '2';
                divContainer.style.opacity = '0.4';
                divContainer.style.filter = 'alpha(opacity=50)';
                var buttons = document.querySelectorAll('button');
                buttons.forEach(function (b) {
                    b.disabled = true;
                });
            }
        });
    });
    buttonsDiv.append(editBtn, deleteBtn);
    textDiv.append(titleH1, destinationParagraph, priceParagraph, shortDescriptionParagraph, longDescriptionParagraph, buttonsDiv);
};
window.ipcRendererCustom.onceInitData(onceInitDataShowDetailTripCb);
var onDetailTripEditedCb = function (e, editedTrip) {
    var tripImage = document.querySelector('img');
    tripImage ? tripImage.src = editedTrip.image : '';
    var titleH1 = document.querySelector('h1');
    titleH1 ? titleH1.textContent = editedTrip.title : '';
    var destinationParagraph = document.getElementById('tripDestination');
    destinationParagraph ? destinationParagraph.textContent = editedTrip.destination : '';
    var priceParagraph = document.getElementById('tripPrice');
    priceParagraph ? priceParagraph.textContent = 'Starts from ' + editedTrip.price + '€/person' : '';
    var shortDescriptionParagraph = document.getElementById('tripShortDescription');
    shortDescriptionParagraph ? shortDescriptionParagraph.textContent = editedTrip.shortDescription : '';
    var longDescriptionParagraph = document.getElementById('tripLongDescription');
    longDescriptionParagraph ? longDescriptionParagraph.textContent = editedTrip.longDescription : '';
};
window.ipcRendererCustom.onDetailTripEdited(onDetailTripEditedCb);
