const decks = (state=initialState, action) => {
	switch (action.type){
	    case ADD_CARD:
		    
			return {
				...state,
				[action.title]: {
					...state[action.title]
					["questions"]: state[action.title]['questions'].concat(action.card)
				
				}
			}
		case ADD_DECK:
			return {
				...state,
				[action.title]:{
					questions:{}
					title:action.title
				}
			}
			
		default:
			return state
	}
}
