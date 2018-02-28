import React, {Component} from 'react'
import {View, Text, TextInput, Alert, KeyboardAvoidingView} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addDeck} from '../actions/index'

import * as api from '../utils/api'

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
		this.setState({title: ''})

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

export default connect(null, {addDeck})(AddDeck)