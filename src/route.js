import React from 'react'
import {View, Text, Button} from 'react-native'
import { 
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
 } from 'react-navigation'

 import Auth from './components/auth'
 import Games from './components/games'
 import News from './components/news'
 import AuthLogin from './components/auth'

 const AppStack = createBottomTabNavigator ({
     News : News,
     Games : Games
 })

 const AuthStack = createStackNavigator ({
    Auth : Auth,
    AuthLogin : AuthLogin
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,
    // }
     
 })

 export const RootNavigator = () => {
     return createAppContainer(createSwitchNavigator({
         App: AppStack,
         Auth: AuthStack
     },{
         initialRouteName: 'Auth'
     }))
 }