import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const DeckInfo = ({title, numOfCards}) => {

	return (
		<View>
			<Text>{title}</Text>
			<Text>{numOfCards} cards</Text>
		</View>
	)

}

export default DeckInfo