import React, {Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
import DeckInfo from './DeckInfo'
import {connect} from 'react-redux'
import TextButton from './TextButton'
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
			<View style={styles.deck}>
				<View style={styles.item}>
					<DeckInfo title={title} numOfCards={questions.length} />
				</View>

				<TextButton onPress={()=>navigation.navigate('AddCard', {title})}>
					Add Card
				</TextButton>

				{questions.length > 0 && (<TextButton onPress={()=>navigation.navigate('Quiz', {title})}>
					Start Quiz
				</TextButton>)}

				<TextButton onPress={()=>navigation.navigate('Decks')}>
					Go Back
				</TextButton>

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

const styles = StyleSheet.create({
	deck:{

		justifyContent:'center',
		alignItems:'center',

	},
	item:{
		padding: 40
	}
})
export default connect(mapStateToProps)(Deck)