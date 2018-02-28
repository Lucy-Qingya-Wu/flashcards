components/AddDeck.js 

import React, {Component} from 'react'
import {View, Text, TextInput, Alert} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addDeck} from actions

import * as api from api

class AddDeck extends Component{

	static navigationOptions = () => {
		return {
			title: 'New Deck'
		}
	}
	
	constructor(props){
		super(props)
		this.state = {
			title: ''
		}
	}
	submitTitle = () =>{
	
	    if (this.state.title.length < 1) {
            return Alert.alert('Missing title', 'Please enter a title.')
        }
	
		const {navigation} = this.props
		// call addDeck in actions
		this.props.addDeck(this.state.title)
		// call addDeck in api
		api.addDeck(this.state.title)
		navigation.goBack()
		
	}
	
	render(){
		const {title} = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={{flex:1}}>
				<Text>
					What is the title of your new deck?
				</Text>
				<TextInput 
					onChangeText={title=>this.setState({title})}
					value={title}
				
				/>
				<TextButton onPress={this.submitTitle}>
					submit
				</TextButton>
			</KeyboardAvoidingView>
		)
	}
}

export default connect(null, {AddDeck})

----------------------------------------------------------------------------------

actions/index.js

import {ADD_DECK, ADD_CARD} from './types' 
export const addDeck = (title) => ({
	type: ADD_DECK,
	title,
})

//title: String, card: Array
export const addCard = (title, card) => {
	type: ADD_CARD,
	title,
	card,
}

---------------------------------------------------------------------------------

components/AddCard.js 


import React, {Component} from 'react'
import {View, Text, TextInput, Alert, KeyboardAvoidingView} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addCard} from actions

import * as api from api

class AddCard extends Component{
	static navigationOptions = {
	
		return {
			title: 'Add Card'
		}
		
	)
	
	constructor(props){
		super(props)
		this.state={
			question:'',
			answer:''
		}
	}
	
	onSubmit = () => {
		const {quesion, answer} = this.state
		const {navigation} = this.props
		
		if (question.length < 1){
			return Alert.alert("Missing question", "Please enter a question")
		}
		if (answer.length < 1){
			return Alert.alert("Missing answer", "Please enter a answer")
		}
		
		this.props.addCard(navigation.state.params, [this.state])
		api.addCard(navigation.state.params, [this.state])
		
		navigation.goBack()
		
	}
	
	render(){
		const {question, answer} = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={{flex:1}} >
				<TextInput
					placeholder='Question'
					onChangeText={question=>this.setState(question)}
					value={question}
				/>
				<TextInput
					placeholder='Answer'
					onChangeText={answer=>this.setState(answer)}
					value={answer}
				/>
				<TextButton onPress={this.onSubmit}>
					submit
				</TextButton>
				
			</KeyboardAvoidingView>
		)
	}

}

export default connect (null, {addCard})(AddCard)
