"use strict";
var tripToEditGlobal = undefined;
//////////////////// ELECTRON
var onceInitDataEditTripCb = function (e, tripToEdit) {
    var inputTitle = document.getElementById('trip-title');
    inputTitle.value = tripToEdit.title;
    var inputDestination = document.getElementById('trip-destination');
    inputDestination.value = tripToEdit.destination;
    var inputPrice = document.getElementById('trip-price');
    inputPrice.value = tripToEdit.price;
    var inputImage = document.getElementById('trip-image');
    inputImage.value = tripToEdit.image;
    var inputShortDescription = document.getElementById('trip-short-description');
    inputShortDescription.value = tripToEdit.shortDescription;
    var textareaLongDescription = document.getElementById('trip-long-description');
    textareaLongDescription.textContent = tripToEdit.longDescription;
    tripToEditGlobal = tripToEdit;
};
window.ipcRendererCustom.onceInitData(onceInitDataEditTripCb);
//////////////////// JS
var editForm = document.getElementById('edit-trip-form');
editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var dataForm = new FormData(e.target);
    tripToEditGlobal.title = dataForm.get('title');
    tripToEditGlobal.destination = dataForm.get('destination');
    tripToEditGlobal.price = dataForm.get('price');
    tripToEditGlobal.image = dataForm.get('image');
    tripToEditGlobal.shortDescription = dataForm.get('short-description');
    tripToEditGlobal.longDescription = dataForm.get('long-description');
    window.ipcRendererCustom.invokeEditTrip(tripToEditGlobal, function (res) {
        var divMessage = document.querySelector('#response-message');
        divMessage.textContent = res.message;
        divMessage.hidden = false;
        divMessage.classList.remove('alert-success', 'alert-danger');
        res.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger');
    });
});
