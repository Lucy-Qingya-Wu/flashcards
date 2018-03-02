import React, {Component} from 'react'
import {View, Text, TextInput, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native'

import TextButton from './TextButton'

import {connect} from 'react-redux'

import {addDeck} from '../actions/index'

import * as api from '../utils/api'
import {black} from '../utils/colors'
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
		navigation.navigate('Deck', {title:this.state.title})
		this.setState({title: ''})

	}

	render(){
		const {title} = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.question}>
					What is the title of your new deck?
				</Text>
				<TextInput
				    style={[styles.input, {marginTop: 0}]}
					onChangeText={title=>this.setState({title})}
					value={title}
					placeholder='Please type the new title here'

				/>
				<TextButton onPress={this.submitTitle}>
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
	},
	question: {
		fontSize:30,
		textAlign:'center',
		margin: 40,
		alignItems: 'center'
	}

})
export default connect(null, {addDeck})(AddDeck)