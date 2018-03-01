import {Notifications, Permissions} from 'expo'
import {NOTIFICATION_KEY} from './_decks'

import {AsyncStorage} from 'react-native'

export function clearLocalNotification(){
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
			.then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification(){
	return {
		title: 'Study today!',
		body: 'It will be harder to remember the flashcards tomorrow.',
		ios: {
			sound:true
		}
	}
}

export function setNotification(){
	AsyncStorage.getItem(NOTIFICATION_KEY)
	    .then(JSON.parse)
	    .then(data=>{
	        console.log("data, ", data, typeof data)
			if (data === null){
				Permissions.askAsync(Permissions.NOTIFICATIONS)
				.then(({status})=>{
					console.log("status: ", status)
					if (status === 'granted'){
						Notifications.cancelAllScheduledNotificationsAsync()
						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate()+1)
						tomorrow.setHours(15)
						tomorrow.setMinutes(15)
						console.log("tomorrow.toString()", tomorrow.toString())
						Notifications.scheduleLocalNotificationAsync(
							createNotification(),
							{
								time:tomorrow,
								repeat:'day'
							}
						)
						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}

				})

			}
		})
}
