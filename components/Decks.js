import React, {Component} from 'react'

import {
	View,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native'

import DeckInfo from './DeckInfo'

import {connect} from 'react-redux'


class Decks extends Component{



    renderItem = ({item}) => {
    	const {navigation} = this.props
    	const {title} = item
    	return (
	    	<TouchableOpacity onPress={()=>navigation.navigate('Deck', {title})}>
	    		<DeckInfo {...item} />
	    	</TouchableOpacity>
    	)
    }

    keyExtractor = (data) => data.title

	render(){
		const {decks} = this.props

        const info = Object.keys(decks).map(key=>{
        	const {title, questions} = decks[key]
        	return {
        		title,
        		numOfCards:questions.length
        	}
        })

		return (
			<View>

				<FlatList
					data={info}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
				/>

			</View>
		)
	}
}

function mapStateToProps(decks){

	return {
		decks
	}

}

export default connect(mapStateToProps)(Decks)