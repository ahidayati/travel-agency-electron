"use strict";
var form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var dataForm = new FormData(e.target);
    // create object
    var newTrip = {
        title: dataForm.get('title'),
        destination: dataForm.get('destination'),
        price: dataForm.get('price'),
        image: dataForm.get('image'),
        shortDescription: dataForm.get('short-description'),
        longDescription: dataForm.get('long-description')
    };
    // send object to the back
    window.ipcRendererCustom.invokeAddNewTrip(newTrip, function (res) {
        var divMessage = document.querySelector('#response-message');
        divMessage.textContent = res.message;
        divMessage.hidden = false;
        divMessage.classList.remove('alert-success', 'alert-danger');
        res.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger');
        Notification.requestPermission().then(function () {
            new Notification('Awesome Travel Desktop App', {
                body: 'Trip has been successfully added'
            });
        });
    });
});
