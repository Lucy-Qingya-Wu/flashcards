import {
	RECEIVED_DECKS,
	ADD_DECK,
	ADD_CARD,
} from './types'

export const receivedDecks = (data) => ({
		type:RECEIVED_DECKS,
		decks: data
})



export const addDeck = (title) => ({
	type: ADD_DECK,
	title,
})

//title: String, card: Array
export const addCard = (title, card) => ({
	type: ADD_CARD,
	title,
	card,
})