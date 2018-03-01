import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'

import {clearLocalNotification, setNotification} from '../utils/helpers'
class Quiz extends Component{
	static navigationOptions = () => {

	   return {
	     title:'Quiz'
	   }

	}

    constructor(props){
		super(props)
		this.state={

			totalNumOfQuestions:0,
			correctAnswer: 0,
			currentQuestionIndex: 0,

			showQuestion: true,
			showAnswer: false,


			done: false,


		}
	}



	componentDidMount = () => {
		const {deck} = this.props
		this.setState({totalNumOfQuestions:deck['questions'].length})

	}


	handleUserAnswer = (userInput) => {

	    const {correctAnswer, showQuestion, showAnswer, currentQuestionIndex, totalNumOfQuestions, done} = this.state

		let score = this.state.correctAnswer

		if (userInput === 'correct'){
			score += 1

		}

		if (currentQuestionIndex+1 > totalNumOfQuestions - 1){
			clearLocalNotification().then(setNotification())
			this.setState({
				correctAnswer:score,
				done:true
			})
		}else{

			this.setState(preState=>{
				return {
					currentQuestionIndex: preState.currentQuestionIndex+1,
					showQuestion: true,
					showAnswer: false,
					correctAnswer:score,
				}
			})

		}




	}

	render(){

	    const {totalNumOfQuestions, correctAnswer, currentQuestionIndex, showQuestion, showAnswer, done} = this.state
		const {deck} = this.props

		const {question, answer} = deck['questions'][currentQuestionIndex]


		if (!done){

			return (
				<View style={styles.center}>


					{showQuestion && (
						<View style={styles.center}>
							<Text style={[styles.text, {fontWeight: 'bold'}]}>{question}</Text>

							<TextButton style={{color: 'red', fontWeight: 'bold'}} onPress={()=>this.setState({showAnswer: true, showQuestion:false})}>show answer</TextButton>
						</View>
					)}


					{showAnswer && (
						<View style={styles.center}>
							<Text style={[styles.text, {fontWeight: 'bold'}]}>{answer}</Text>

							<TextButton  style={{color: 'red', fontWeight: 'bold'}} onPress={()=>this.setState({showAnswer: false, showQuestion:true})}>show question</TextButton>
						</View>
					)}


					<TextButton style={[styles.btn, {color:'black'}]} onPress={()=>this.handleUserAnswer("correct")}>Correct</TextButton>
					<TextButton style={[styles.btn, {color:'red'}]} onPress={()=>this.handleUserAnswer("incorrect")}>Incorrect</TextButton>


				</View>
			)
		}
		else{
			return (
				<View>
					<Text>
						Your answered {correctAnswer/totalNumOfQuestions*100} % question(s) correctly !
					</Text>
				</View>
			)
		}
	}
}

function mapStateToProps(decks, {navigation}){

    const {title} = navigation.state.params
	return {
		deck: decks[title]
	}
}

const styles = StyleSheet.create({
	center:{

		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
	    padding: 20,
	    textAlign: 'center',
	    fontSize:30,

	},
	btn: {
		borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
	    fontSize:15,
	    borderRadius: 7,
	    padding: 5,
	    margin: 10,
	    height: 45,
	    width: '40%',
	}
})

export default connect(mapStateToProps)(Quiz)