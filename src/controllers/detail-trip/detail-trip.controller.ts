const onceInitDataShowDetailTripCb = (e: any, tripToShow: any) => {
    const imageDiv = document.querySelector('#imageDiv') as HTMLElement

    const imageElement = document.createElement('img')
    imageElement.style.maxHeight = '350px'
    imageElement.alt = `trip-${tripToShow.id}-image`
    imageElement.src = tripToShow.image

    imageDiv.append(imageElement)

    const textDiv = document.querySelector('#textDiv') as HTMLElement

    const titleH1 = document.createElement('h1')
    titleH1.textContent = tripToShow.title

    const destinationParagraph = document.createElement('p')
    destinationParagraph.id = 'tripDestination'
    destinationParagraph.textContent =tripToShow.destination

    const priceParagraph = document.createElement('p')
    priceParagraph.id = 'tripPrice'
    priceParagraph.textContent = 'Starts from '+tripToShow.price+'€/person'

    const shortDescriptionParagraph = document.createElement('p')
    shortDescriptionParagraph.id = 'tripShortDescription'
    shortDescriptionParagraph.textContent = tripToShow.shortDescription

    const longDescriptionParagraph = document.createElement('p')
    longDescriptionParagraph.id = 'tripLongDescription'
    longDescriptionParagraph.textContent = tripToShow.longDescription

    const buttonsDiv = document.createElement('div')

    const editBtn = document.createElement('button')
    const editIcon = document.createElement('i')
    editIcon.classList.add('fa-regular', 'fa-pen-to-square')
    editBtn.append(editIcon, ' Modify')
    editBtn.classList.add('btn', 'btn-outline-secondary', 'text-capitalize', 'm-2')
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendAskShowEditTripForm(tripToShow.id)
    })

    const deleteBtn = document.createElement('button')
    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-regular', 'fa-trash-can')
    deleteBtn.append(deleteIcon, ' Delete')
    deleteBtn.classList.add('btn', 'btn-outline-secondary', 'text-capitalize')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.invokeRemoveTrip(tripToShow.id, (response: any) => {
            if(response.success){
                const divMessage = document.querySelector('#response-message')! as HTMLElement
                divMessage.textContent = response.message
                divMessage.hidden = false

                divMessage.classList.remove('alert-success', 'alert-danger')
                response.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger')

                const divContainer = document.querySelector('.container') as HTMLElement
                divContainer.style.position = 'absolute'
                divContainer.style.width = '100%'
                divContainer.style.height = '100%'
                divContainer.style.zIndex = '2'
                divContainer.style.opacity = '0.4'
                divContainer.style.filter = 'alpha(opacity=50)'

                const buttons = document.querySelectorAll('button')
                buttons.forEach((b) => {
                    b.disabled = true
                })
            }
        })
    })

    buttonsDiv.append(editBtn, deleteBtn)
    textDiv.append(titleH1, destinationParagraph, priceParagraph, shortDescriptionParagraph, longDescriptionParagraph, buttonsDiv)
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataShowDetailTripCb)

const onDetailTripEditedCb = (e: any, editedTrip: any) => {
    const tripImage = document.querySelector('img')
    tripImage ? tripImage.src = editedTrip.image : ''

    const titleH1 = document.querySelector('h1')
    titleH1 ? titleH1.textContent = editedTrip.title : ''

    const destinationParagraph = document.getElementById('tripDestination')
    destinationParagraph ? destinationParagraph.textContent = editedTrip.destination : ''

    const priceParagraph = document.getElementById('tripPrice')
    priceParagraph ? priceParagraph.textContent = 'Starts from '+editedTrip.price+'€/person' : ''

    const shortDescriptionParagraph = document.getElementById('tripShortDescription')
    shortDescriptionParagraph ? shortDescriptionParagraph.textContent = editedTrip.shortDescription : ''

    const longDescriptionParagraph = document.getElementById('tripLongDescription')
    longDescriptionParagraph ? longDescriptionParagraph.textContent = editedTrip.longDescription : ''
}
(window as any).ipcRendererCustom.onDetailTripEdited(onDetailTripEditedCb)