import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

const TextButton = ({ onPress, children }) => {
	console.log("Quiz, TextButton, children: ", children)
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>{children}</Text>
		</TouchableOpacity>
	)
}

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

			answered: false,
			done: false,

			input: ''
		}
	}

	nextQuestion = () => {
	    const {currentQuestionIndex} = this.state

		this.setState(preState=>{
			return {currentQuestionIndex: preState.currentQuestionIndex+1, showQuestion: true, showAnswer: false, answered:false}
		})
	}

	componentDidMount = () => {
		const {deck} = this.props
		this.setState({totalNumOfQuestions:deck['questions'].length})

	}
	finishedQuiz = () => {
	    const {done} = this.state
		this.setState({done:true})
	}

	handleUserAnswer = (userInput, answer) => {
	    const {correctAnswer, showQuestion, showAnswer, answered} = this.state
		let score = this.state.correctAnswer
		if (userInput === answer){
			score += 1
		}
		this.setState(preState=>{
			return {

				showAnswer:true,
				showQuestion: false,
				answered: true,
				correctAnswer:score,
			}
		})

	}

	render(){

	    const {totalNumOfQuestions, correctAnswer, currentQuestionIndex, showQuestion, showAnswer, answered, done, input} = this.state
		const {deck} = this.props
		const {question, answer} = deck['questions'][currentQuestionIndex]
		let shortAnswer = answer !== 'correct' && answer !== 'incorrect'

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

					{!answered && !shortAnswer && (
						<View>
							<TextButton onPress={()=>this.handleUserAnswer("correct", answer)}>correct</TextButton>
							<TextButton onPress={()=>this.handleUserAnswer("incorrect", answer)}>incorrect</TextButton>
						</View>
					)}

					{!answered && shortAnswer && (

						    <KeyboardAvoidingView behavior='padding'>
								<TextInput
									value={input}
									onChangeText={input=>this.setState({input})}
								/>
							    <TextButton onPress={()=>this.handleUserAnswer(this.state.input, answer)}>submit</TextButton>

							</KeyboardAvoidingView>

					)}

					{answered && currentQuestionIndex+1 > totalNumOfQuestions - 1 && (
						<View>
							<TextButton onPress={()=>this.finishedQuiz()}>Done</TextButton>
						</View>
					)}

					{answered && currentQuestionIndex+1 <= totalNumOfQuestions - 1 && (
						<View>
							<TextButton onPress={()=>this.nextQuestion()}>NEXT QUESTION -></TextButton>
						</View>
					)}

				</View>
			)
		}
		else{
			return (
				<View>
					<Text>
						Your answered {correctAnswer/totalNumOfQuestions*100} % of {totalNumOfQuestions} question(s) correctly =)
					</Text>
				</View>
			)
		}
	}
}

function mapStateToProps(decks, {navigation}){
	console.log("in Quiz, mapStateToProps, decks", decks)
	console.log("in Quiz, mapStateToProps, navigation", navigation)

    const {title} = navigation.state.params
	return {
		deck: decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)