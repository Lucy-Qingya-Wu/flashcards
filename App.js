import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar as ReactNativeStatusBar,
} from 'react-native';

import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

import {TabNavigator, StackNavigator} from 'react-navigation'
import {black, white, purple} from './utils/colors'
import {Constants} from 'expo'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

import reducer from './reducers'
import {Provider} from 'react-redux'
import {createStore} from 'redux'


import {clearLocalNotification, setNotification} from './utils/helpers'
const Tabs = TabNavigator({
  Decks:{
    screen:Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({tintColor})=><Ionicons name='ios-bookmarks' size={30} color={tintColor} />

    }

  },
  AddDeck:{
    screen:AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({tintColor})=><FontAwesome name='plus-square' size={30} color={tintColor} />

    }
  },
}, {

  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? purple:white,
    style:{
      height:56,
      backgroundColor:Platform.OS === 'ios' ? white:purple,
      shadowColor:'rgba(0,0,0,0.24)',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }
  }
})

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  },
  Deck:{
    screen: Deck,

  },
  Quiz:{
    screen: Quiz,

  },
  AddCard:{
    screen: AddCard,

  }
}, {

    navigationOptions: {


      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }

})
function StatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <ReactNativeStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount(){
    clearLocalNotification().then(setNotification())
  }
  render() {

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


