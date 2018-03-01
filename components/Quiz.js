import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'


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
				<View>


					{showQuestion && (
						<View>
							<Text>{question}</Text>
							<TextButton onPress={()=>this.setState({showAnswer: true, showQuestion:false})}>show answer</TextButton>
						</View>
					)}


					{showAnswer && (
						<View>
							<Text>Answer: {answer}</Text>
							<TextButton onPress={()=>this.setState({showAnswer: false, showQuestion:true})}>show questionr</TextButton>
						</View>
					)}


					<TextButton style={{color:'black'}} onPress={()=>this.handleUserAnswer("correct")}>Correct</TextButton>
					<TextButton style={{color:'red'}} onPress={()=>this.handleUserAnswer("incorrect")}>Incorrect</TextButton>


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

export default connect(mapStateToProps)(Quiz)