import {
	RECEIVED_DECKS,
} from './types'

export const receivedDecks = (data) => ({
		type:RECEIVED_DECKS,
		decks: data
})
