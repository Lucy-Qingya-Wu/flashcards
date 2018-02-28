import {TouchableOpacity, Text} from 'react-native'
import React from 'react'
const TextButton = ({ onPress, children }) => {

	return (
		<TouchableOpacity onPress={onPress}>
			<Text>{children}</Text>
		</TouchableOpacity>
	)
}

export default TextButton