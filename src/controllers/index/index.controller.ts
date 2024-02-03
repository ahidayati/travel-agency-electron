
const generateCard = (tripItem: any) => {
    const cardsContainer = document.querySelector('#cardsContainer')!

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card', 'shadow', 'mx-3', 'my-3', 'card-div')
    cardDiv.dataset.id = tripItem.id
    cardDiv.style.width= '20rem'

    const cardImage = document.createElement('img')
    cardImage.classList.add('card-img-top', 'trip-image')
    cardImage.dataset.id = tripItem.id
    cardImage.alt = `trip-${tripItem.id}-image`
    cardImage.style.maxHeight = '200px'
    cardImage.style.objectFit = 'cover'
    cardImage.src = tripItem.image

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title', 'trip-title')
    cardTitle.dataset.id = tripItem.id
    cardTitle.textContent = tripItem.title

    const cardDestination = document.createElement('p')
    cardDestination.classList.add('trip-destination')
    cardDestination.dataset.id = tripItem.id
    cardDestination.textContent = tripItem.destination

    const cardShortDescription = document.createElement('p')
    cardShortDescription.classList.add('trip-short-description')
    cardShortDescription.dataset.id = tripItem.id
    cardShortDescription.textContent = tripItem.shortDescription

    const cardPrice = document.createElement('p')
    cardPrice.classList.add('trip-price')
    cardPrice.dataset.id = tripItem.id
    cardPrice.textContent = 'Starts from '+tripItem.price + '€/person'

    const detailLink = document.createElement('a')
    detailLink.classList.add('btn', 'btn-outline-dark')
    detailLink.textContent = 'See Details'
    detailLink.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendShowDetailTrip(tripItem.id)
    })

    cardBody.append(cardTitle, cardDestination, cardShortDescription, cardPrice, detailLink)
    cardDiv.append(cardImage, cardBody)
    cardsContainer.appendChild(cardDiv)

}

//////////////////// ELECTRON
const onceInitDataCb = (e: any, data: any) => {
    // put cards on div
    data.forEach((tI: any) => {
        generateCard(tI)
    })
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataCb)

const onNewTripAddedCb = (e: any, data: any) => {
    // update cards
    generateCard(data)
}
(window as any).ipcRendererCustom.onNewTripAdded(onNewTripAddedCb)

const onTripEditedCb = (e: any, editedTrip: any) => {
    const cardImage = document.querySelector(`.trip-image[data-id='${editedTrip.id}']`) as HTMLImageElement
    cardImage ? cardImage.src = editedTrip.image : ''

    const cardTitle = document.querySelector(`.trip-title[data-id='${editedTrip.id}']`)
    cardTitle ? cardTitle.textContent = editedTrip.title : ''

    const cardDestination = document.querySelector(`.trip-destination[data-id='${editedTrip.id}']`)
    cardDestination ? cardDestination.textContent = editedTrip.destination : ''

    const cardPrice = document.querySelector(`.trip-price[data-id='${editedTrip.id}']`)
    cardPrice ? cardPrice.textContent = 'Starts from '+editedTrip.price+'€/person' : ''

    const cardShortDescription = document.querySelector(`.trip-short-description[data-id='${editedTrip.id}']`)
    cardShortDescription ? cardShortDescription.textContent = editedTrip.shortDescription : ''
}
(window as any).ipcRendererCustom.onTripEdited(onTripEditedCb)

const onTripRemovedCb = (e: any, id: any) => {
    const cardDivToRemove = document.querySelector(`.card-div[data-id='${id}']`) as HTMLElement
    cardDivToRemove.remove()
}
(window as any).ipcRendererCustom.onTripRemoved(onTripRemovedCb)

//////////////////// JS
const buttonAskShowNewTripForm = document.querySelector('#ask-show-new-trip-form')!
buttonAskShowNewTripForm.addEventListener('click', (e: any)=> {
    (window as any).ipcRendererCustom.sendAskShowNewTripForm()
})



