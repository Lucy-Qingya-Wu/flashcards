import {
  RECEIVED_DECKS,
  ADD_CARD,
  ADD_DECK
} from '../actions/types'


// const initialState = {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

const decks = (state={}, action) => {
	switch (action.type){
        case RECEIVED_DECKS:
            return action.decks
	    case ADD_CARD:
	    	const {title, card} = action

			console.log("state: ", state)
			console.log("state[title]: ", state[title])

			console.log("title: ", title)
			console.log("card: ", card)

			return Object.assign({}, state, {
				[title]:{
					...state[title],
					"questions":state[title]["questions"].concat(card)
				}
			})

		case ADD_DECK:

			return Object.assign({}, state, {

				[action.title]:{
					questions:[],
					"title":action.title
				}
			})

		default:
			return state
	}
}



export default decks