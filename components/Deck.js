import React, {Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native'
import DeckInfo from './DeckInfo'
import {connect} from 'react-redux'

class Deck extends Component{

	static navigationOptions = ({ navigation }) => {
	   const { title } = navigation.state.params

	   return {
	     title
	   }
	}


	render(){
		const {deck, navigation} = this.props
		console.log("Deck, this.props: ", this.props)
		const {title, questions} = deck
		console.log("title: ", title)
		return (
			<View>
				<DeckInfo title={title} numOfCards={questions.length} />

				<TouchableOpacity onPress={()=>navigation.navigate('AddCard', {title})}>
					<Text>Add Card</Text>
				</TouchableOpacity>

				{questions.length > 0 && (<TouchableOpacity onPress={()=>navigation.navigate('Quiz', {title})}>
					<Text>Start Quiz</Text>
				</TouchableOpacity>)}
			</View>
		)
	}


}
function mapStateToProps(decks, {navigation}){
	const { title } = navigation.state.params
	return {
		deck:decks[title]
	}
}
export default connect(mapStateToProps)(Deck)