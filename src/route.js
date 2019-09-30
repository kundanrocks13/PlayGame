import React from 'react'
import {View, Text, Button} from 'react-native'
import { 
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
 } from 'react-navigation'

 import Auth from './screens/auth'
 import Games from './screens/games'
 import News from './screens/news'
 import AuthLogin from './screens/auth'
import NewsArticles from './screens/news/newsArticles'
import GamesArticles from './screens/games/gamesArticles'

const NewsStack = createStackNavigator ({
    News : News,
    NewsArticles : NewsArticles
})

const GamesStack = createStackNavigator ({
    Games : Games,
    GamesArticles : GamesArticles
})

 const AppStack = createBottomTabNavigator ({
     News : NewsStack,
     Games : GamesStack
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