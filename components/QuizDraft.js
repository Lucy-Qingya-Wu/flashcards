import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
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
			currentQuestionIndex: 1,
			
			showQuestion: true,
			showAnswer: false,
			
			answered: false,
			done: false,
		}
	}
	
	nextQuestion = () => {
		this.setState(preState=>{
			return {currentQuestionIndex: preState.currentQuestionIndex+1, showQuestion: true, showAnswer: false}
		})
	}
	
	componentDidMount(){
		const {deck} = this.props
		this.setState({totalNumOfQuestions:deck['questions'].length})
	}
     
	handleUserAnswer(userInput, answer){
		if (userInput === answer){
			
		}
	}

	render(){
	
	    const {totalNumOfQuestions, correctAnswer, currentQuestionIndex, showQuestion, showAnswer, done} = this.state
		const {question, answer} = this.props.deck['questions'][currentQuestionIndex]
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
							<TextButton onPress={()=>this.setState({showAnswer: true, showQuestion:false})}>showAnswer</TextButton>
						</View>
					)}
					
					// show "incorrect/correct" button or show "NEXT QUESTION ->" button or show "DONE" button
					{!answered && (
						<View>
							<TextButton onPress={()=>this.handleUserAnswer("correct", answer)}>correct</TextButton>
							<TextButton onPress={()=>this.handleUserAnswer("incorrect", answer)}>incorrect</TextButton>
						</View>
					)}
					
					{answered && (
						
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
