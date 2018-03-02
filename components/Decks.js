import React, {Component} from 'react'

import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet
} from 'react-native'

import DeckInfo from './DeckInfo'

import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receivedDecks} from '../actions/index'

class Decks extends Component{


	componentDidMount(){
		getDecks().then(data=>this.props.receivedDecks(data))
	}

    renderItem = ({item}) => {
    	const {navigation} = this.props
    	const {title} = item
    	return (
	    	<TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Deck', {title})}>
	    		<DeckInfo {...item} />
	    	</TouchableOpacity>
    	)
    }

    keyExtractor = (data) => data.title

	renderSeparator = () => {
	    return (
	        <View
	          style={{
	            height: 1,
	            backgroundColor: "#CED0CE",

	          }}
	        />
	    )
	 }

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
			<View style={styles.container}>

				<FlatList
                    ItemSeparatorComponent={this.renderSeparator}
					data={info}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
				/>
			</View>

		)
	}
}

const mapStateToProps = (decks) => ({ decks })

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop: 20,

	},
	item:{

		padding: 20
	}
})
export default connect(mapStateToProps, {receivedDecks})(Decks)