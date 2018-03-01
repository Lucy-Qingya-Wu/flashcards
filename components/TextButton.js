import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react'
import {lightPurp} from '../utils/colors'
const TextButton = ({ onPress, style=[], children }) => {

	return (
		<TouchableOpacity onPress={onPress} style={styles.btn}>
			<Text style={[styles.btnText, style]}>{children}</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	btn: {

	    padding: 10,
	    borderRadius: 7,
	    height: 45,
	    marginLeft: 40,
	    marginRight: 40
	},
	btnText:{
		fontSize: 20,
		color: lightPurp
	}
})
export default TextButton