import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'

import { RootNavigator } from './route'

class App extends React.Component{
  render() {
    const Nav = RootNavigator()
    return(
      <View style={{flex:1}} >
        <Nav/>
      </View>
    )
  }
}

export default App;
