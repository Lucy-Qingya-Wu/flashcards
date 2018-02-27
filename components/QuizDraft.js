import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

export const TextButton = ({ onPress, style={}, children }){
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[style]}>{children}</Text>
		</TouchableOpacity>
	)
}

export default class Quiz extends Component{
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
		if (totalNumOfQuestions === 0){
			return (<View>There is no question in this quiz.</View>)
		}
		if (!done){
		
			return (
				<View>
					// show question or not
					
					{showQuestion && (
						<View>
							<Text>{question}</Text>
							<TextButton onPress={()=>this.setState({showAnswer: true, showQuestion:false})}>showAnswer</TextButton>
						</View>
					)}
					
					// show answer or not
					{showAnswer && (
						<View>
							<Text>Answer: {answer}</Text>
							<TextButton onPress={()=>this.setState({showAnswer: false, showQuestion:true})}>showAnswer</TextButton>
						</View>
					)}
					
					// show "incorrect/correct" button or show "NEXT QUESTION ->" button or show "DONE" button
					{!answered && !shortAnswer && (
						<View>
							<TextButton onPress={()=>this.handleUserAnswer("correct", answer)}>correct</TextButton>
							<TextButton onPress={()=>this.handleUserAnswer("incorrect", answer)}>incorrect</TextButton>
						</View>
					)}
					
					{!answered && shortAnswer && (
						<View>
						    <KeyboardAvoidingView behavior='padding'>
								<TextInput
									value={input}
									onChangeText={input=>this.setState({input})}
								/>
							</KeyboardAvoidingView>
							<TextButton onPress={()=>this.handleUserAnswer(this.state.input, answer)}>submit</TextButton>
						</View>
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
						Your answered {correctAnswer/totalNumOfQuestions*100} of {totalNumOfQuestions} questions correctly =)
					</Text>
				</View>
			)
		}
	}
}

function mapStateToProps(decks, {navigation}){
    const {title} = navigation.state.param
	return{
		deck: decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)
