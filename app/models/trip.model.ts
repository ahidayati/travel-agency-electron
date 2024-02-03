export interface Trip {
    id: number
    title: string
    destination: string
    price: number
    image: string
    shortDescription: string
    longDescription: string
}

export namespace Trip {

    // pictures placeholder source: https://picsum.photos/
    export function generateFakeData(): Trip[]{
        return [
            {
                id: 1,
                title: 'Bali Getaway',
                destination: 'Bali, Indonesia',
                price: 3999,
                image: 'https://picsum.photos/id/124/300/300',
                shortDescription: 'Captivating journey to a tropical paradise.',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },
            {
                id: 2,
                title: 'Discover Seoul',
                destination: 'Seoul, South Korea',
                price: 3499,
                image: 'https://picsum.photos/id/351/300/300',
                shortDescription: 'Exploring a dynamic blend of tradition and modernity.',
                longDescription: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            {
                id: 3,
                title: 'Autumn in Copenhagen',
                destination: 'Copenhagen, Denmark',
                price: 1299,
                image: 'https://picsum.photos/id/164/300/300',
                shortDescription: 'A delightful experience of Scandinavian charm and innovation.',
                longDescription: 'Ut enim ad minim veniam, quis nostrud velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum reprehenderit in voluptate velit.'
            },
        ]
    }
}