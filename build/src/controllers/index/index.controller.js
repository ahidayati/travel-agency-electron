"use strict";
var generateCard = function (tripItem) {
    var cardsContainer = document.querySelector('#cardsContainer');
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'shadow', 'mx-3', 'my-3', 'card-div');
    cardDiv.dataset.id = tripItem.id;
    cardDiv.style.width = '20rem';
    var cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top', 'trip-image');
    cardImage.dataset.id = tripItem.id;
    cardImage.alt = "trip-".concat(tripItem.id, "-image");
    cardImage.style.maxHeight = '200px';
    cardImage.style.objectFit = 'cover';
    cardImage.src = tripItem.image;
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'trip-title');
    cardTitle.dataset.id = tripItem.id;
    cardTitle.textContent = tripItem.title;
    var cardDestination = document.createElement('p');
    cardDestination.classList.add('trip-destination');
    cardDestination.dataset.id = tripItem.id;
    cardDestination.textContent = tripItem.destination;
    var cardShortDescription = document.createElement('p');
    cardShortDescription.classList.add('trip-short-description');
    cardShortDescription.dataset.id = tripItem.id;
    cardShortDescription.textContent = tripItem.shortDescription;
    var cardPrice = document.createElement('p');
    cardPrice.classList.add('trip-price');
    cardPrice.dataset.id = tripItem.id;
    cardPrice.textContent = 'Starts from ' + tripItem.price + '€/person';
    var detailLink = document.createElement('a');
    detailLink.classList.add('btn', 'btn-outline-dark');
    detailLink.textContent = 'See Details';
    detailLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.ipcRendererCustom.sendShowDetailTrip(tripItem.id);
    });
    cardBody.append(cardTitle, cardDestination, cardShortDescription, cardPrice, detailLink);
    cardDiv.append(cardImage, cardBody);
    cardsContainer.appendChild(cardDiv);
};
//////////////////// ELECTRON
var onceInitDataCb = function (e, data) {
    // put cards on div
    data.forEach(function (tI) {
        generateCard(tI);
    });
};
window.ipcRendererCustom.onceInitData(onceInitDataCb);
var onNewTripAddedCb = function (e, data) {
    // update cards
    generateCard(data);
};
window.ipcRendererCustom.onNewTripAdded(onNewTripAddedCb);
var onTripEditedCb = function (e, editedTrip) {
    var cardImage = document.querySelector(".trip-image[data-id='".concat(editedTrip.id, "']"));
    cardImage ? cardImage.src = editedTrip.image : '';
    var cardTitle = document.querySelector(".trip-title[data-id='".concat(editedTrip.id, "']"));
    cardTitle ? cardTitle.textContent = editedTrip.title : '';
    var cardDestination = document.querySelector(".trip-destination[data-id='".concat(editedTrip.id, "']"));
    cardDestination ? cardDestination.textContent = editedTrip.destination : '';
    var cardPrice = document.querySelector(".trip-price[data-id='".concat(editedTrip.id, "']"));
    cardPrice ? cardPrice.textContent = 'Starts from ' + editedTrip.price + '€/person' : '';
    var cardShortDescription = document.querySelector(".trip-short-description[data-id='".concat(editedTrip.id, "']"));
    cardShortDescription ? cardShortDescription.textContent = editedTrip.shortDescription : '';
};
window.ipcRendererCustom.onTripEdited(onTripEditedCb);
var onTripRemovedCb = function (e, id) {
    var cardDivToRemove = document.querySelector(".card-div[data-id='".concat(id, "']"));
    cardDivToRemove.remove();
};
window.ipcRendererCustom.onTripRemoved(onTripRemovedCb);
//////////////////// JS
var buttonAskShowNewTripForm = document.querySelector('#ask-show-new-trip-form');
buttonAskShowNewTripForm.addEventListener('click', function (e) {
    window.ipcRendererCustom.sendAskShowNewTripForm();
});
