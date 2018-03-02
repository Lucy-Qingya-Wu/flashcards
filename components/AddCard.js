import React, {Component} from 'react'
import {View, Text, TextInput, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addCard} from '../actions/index'

import * as api from '../utils/api'
import {black} from '../utils/colors'

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

				<KeyboardAvoidingView behavior='padding' style={styles.container} >

					<TextInput
						style={styles.input}
						placeholder='Please type your question here'
						onChangeText={question=>this.setState({question})}
						value={question}
					/>
					<TextInput
						style={[styles.input, {marginTop: 0}]}
						placeholder='Please type your answer here'
						onChangeText={answer=>this.setState({answer})}
						value={answer}
					/>
					<TextButton onPress={this.onSubmit}>
					    Submit
				    </TextButton>

				    <TextButton onPress={()=>this.props.navigation.goBack()}>
					    Cancel
				    </TextButton>

				</KeyboardAvoidingView>


		)
	}

}
const styles = StyleSheet.create({
	container:{

		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
	    padding: 10,
	    borderRadius: 7,
	    height: 45,
	    width: '95%',
	    textAlign: 'center',
	    fontSize:15,
	    borderColor: black,
        borderWidth: 0.5,
        margin: 20,
	}

})
export default connect(null, {addCard})(AddCard)
