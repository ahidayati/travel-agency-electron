let tripToEditGlobal: any = undefined

//////////////////// ELECTRON
const onceInitDataEditTripCb = (e: any, tripToEdit: any) => {
    const inputTitle = document.getElementById('trip-title') as HTMLInputElement
    inputTitle.value = tripToEdit.title

    const inputDestination = document.getElementById('trip-destination') as HTMLInputElement
    inputDestination.value = tripToEdit.destination

    const inputPrice = document.getElementById('trip-price') as HTMLInputElement
    inputPrice.value = tripToEdit.price

    const inputImage = document.getElementById('trip-image') as HTMLInputElement
    inputImage.value = tripToEdit.image

    const inputShortDescription = document.getElementById('trip-short-description') as HTMLInputElement
    inputShortDescription.value = tripToEdit.shortDescription

    const textareaLongDescription = document.getElementById('trip-long-description') as HTMLTextAreaElement
    textareaLongDescription.textContent = tripToEdit.longDescription

    tripToEditGlobal = tripToEdit
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataEditTripCb)

//////////////////// JS
const editForm = document.getElementById('edit-trip-form')!

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataForm = new FormData(e.target as HTMLFormElement)

    tripToEditGlobal.title = dataForm.get('title')
    tripToEditGlobal.destination = dataForm.get('destination')
    tripToEditGlobal.price = dataForm.get('price')
    tripToEditGlobal.image = dataForm.get('image')
    tripToEditGlobal.shortDescription = dataForm.get('short-description')
    tripToEditGlobal.longDescription = dataForm.get('long-description')
    ;

    (window as any).ipcRendererCustom.invokeEditTrip(tripToEditGlobal, (res: any) => {
        const divMessage = document.querySelector('#response-message')! as HTMLElement
        divMessage.textContent = res.message
        divMessage.hidden = false

        divMessage.classList.remove('alert-success', 'alert-danger')
        res.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger')
    })
})