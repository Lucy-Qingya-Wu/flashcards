import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class AddCard extends Component{
	static navigationOptions = () => {

	   return {
	     title:'Add Card'
	   }
	}
	render(){
		return (
			<View>
				<Text>Add Card</Text>
			</View>
		)
	}
}