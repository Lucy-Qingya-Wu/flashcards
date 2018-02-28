import React, {Component} from 'react'
import {View, Text, TextInput, Alert, KeyboardAvoidingView} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addCard} from '../actions/index'

import * as api from '../utils/api'

class AddCard extends Component{
	static navigationOptions = () => {

		return {
			title: 'Add Card'
		}

	}

	constructor(props){
		super(props)
		this.state={
			question:'',
			answer:''
		}
	}

	onSubmit = () => {
		const {question, answer} = this.state
		const {navigation} = this.props

		if (question.length < 1){
			return Alert.alert("Missing question", "Please enter a question")
		}
		if (answer.length < 1){
			return Alert.alert("Missing answer", "Please enter a answer")
		}

		this.props.addCard(navigation.state.params['title'], [this.state])
		api.addCard(navigation.state.params['title'], [this.state])

		navigation.goBack()

	}

	render(){
		const {question, answer} = this.state
		return (

				<KeyboardAvoidingView behavior='padding' style={{flex:1}} >
				    <Text>{JSON.stringify(this.state)}</Text>
					<TextInput

						placeholder='Question'
						onChangeText={question=>this.setState({question})}
						value={question}
					/>
					<TextInput
						placeholder='Answer'
						onChangeText={answer=>this.setState({answer})}
						value={answer}
					/>
					<TextButton onPress={this.onSubmit}>
					    submit
				    </TextButton>

				</KeyboardAvoidingView>


		)
	}

}

export default connect(null, {addCard})(AddCard)
