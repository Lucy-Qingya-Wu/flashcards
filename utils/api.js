import {AsyncStorage} from 'react-native'
import {DECKS_STORAGE_KEY} from './_decks'

export function getDecks(){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
			.then(data=>{

				if (data === null){
					AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
					return {}
				}
				return JSON.parse(data)

			})
}

export function addDeck(title){
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]:{
			title,
			questions:[]
		}
	}))
}

// title: String
// card: Array [{question: 'what are you doing?', answer:'coding'}]
export function addCard(title, card){
	return getDecks().then(
		data=>AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
			[title]:{
				["questions"]:data[title]["questions"].concat(card)
			}
		})
	))

}