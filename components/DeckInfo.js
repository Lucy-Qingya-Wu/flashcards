import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,

} from 'react-native'

const DeckInfo = ({title, numOfCards}) => {

	return (
		<View>
			<Text style={styles.header}>{title}</Text>
			<Text style={styles.subHeader}>{numOfCards} cards</Text>
		</View>
	)

}
const styles = StyleSheet.create({
	header:{
		fontSize:40,
		textAlign:'center'
	},
	subHeader:{
		fontSize:20,
		textAlign:'center'
	},

})
export default DeckInfo