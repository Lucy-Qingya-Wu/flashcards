import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import {lightPurp, purple} from '../utils/colors'
import {Ionicons} from '@expo/vector-icons'

import * as Progress from 'react-native-progress'
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
			progress: 0


		}
	}



	componentDidMount = () => {
		const {deck} = this.props
		this.setState({totalNumOfQuestions:deck['questions'].length})

	}


	handleUserAnswer = (userInput) => {

	    const {correctAnswer, showQuestion, progress, showAnswer, currentQuestionIndex, totalNumOfQuestions, done} = this.state

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
					progress: (preState.currentQuestionIndex+1)/totalNumOfQuestions,

					showQuestion: true,
					showAnswer: false,
					correctAnswer:score,
				}
			})

		}




	}

	render(){

	    const {totalNumOfQuestions, correctAnswer, progress, currentQuestionIndex, showQuestion, showAnswer, done} = this.state
		const {deck} = this.props

		const {question, answer} = deck['questions'][currentQuestionIndex]

		console.log("progress", progress)
		if (!done){

			return (
				<View style={styles.center}>
					<View style={{flexDirection: 'row'}}>
						<View style={{paddingTop:20}}>
							<Progress.Bar progress={progress} height={8} width={200} />
						</View>
					    <Text style={{paddingTop:17}}>{currentQuestionIndex+1}/{totalNumOfQuestions}</Text>
					</View>
					{showQuestion && (
						<View style={{alignItems: 'center', height:'60%', width:'90%', paddingTop:40}}>
							<Text style={styles.text}>{question}</Text>

							<TextButton style={{color:'red'}} onPress={()=>this.setState({showAnswer: true, showQuestion:false})}>show answer</TextButton>
						</View>
					)}


					{showAnswer && (
						<View style={{alignItems: 'center', height:'60%', width:'90%', paddingTop:40}}>
							<Text style={styles.text}>{answer}</Text>

							<TextButton style={{color:'red'}} onPress={()=>this.setState({showAnswer: false, showQuestion:true})}>show question</TextButton>
						</View>
					)}


					<TouchableOpacity
						style={styles.btn}
						onPress={()=>this.handleUserAnswer("correct")}
					><Text style={{color:'black', fontSize:20}}>Correct</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.btn}
						onPress={()=>this.handleUserAnswer("incorrect")}
					><Text style={{color:'red', fontSize:20}}>Incorrect</Text>
					</TouchableOpacity>


				</View>
			)
		}
		else{
			return (
				<View style={{alignItems: 'center', justifyContent:'center', paddingTop: 20}}>
					<Text style={{fontSize:40, textAlign:'center'}}>
						Your answered {correctAnswer/totalNumOfQuestions*100} % question(s) correctly !
					</Text>
					<Ionicons
						name='ios-happy-outline'
						size={100}
						color='orange'
						style={{paddingTop: 20}}
					/>
					<TextButton onPress={()=>this.props.navigation.goBack()}>
					    Go Back
				    </TextButton>
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

		alignItems: 'center',
	},
	text: {

		fontSize: 30

	},
	btn: {

		borderWidth: 2,
		padding: 10,
		borderRadius: 7,
		height: 50,
		width: '40%',
		marginLeft: 40,
		marginTop: 10,
		marginRight: 40,
		alignItems: 'center',
	}
})

export default connect(mapStateToProps)(Quiz)