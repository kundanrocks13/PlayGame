import React from 'react'
import { Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native'
import AuthLogo from './authLogo'
import AuthLogin from './authLogin'
import {getTokens} from '../../components/constant'

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { refreshToken } from '../../store/actions/user_action'
import { bindActionCreators } from 'redux'

class Auth extends React.Component{ 
    static navigationOptions = {
        header: null
    }

    state = {
        isLoading: false
    }

    componentDidMount(){
        let userLoggedIn = false
        getTokens((value)=>{
            this.props.refreshToken(value).then((response) => {
                console.log('success index-------')
            })
            console.log('get token value  ---- ', JSON.stringify(value))
            // this.props.refreshToken()
        })
        // let keys = ['@play_game@refreshToken', '@play_game@idToken', '@play_game@expireToken', '@play_game@localId'];

        // AsyncStorage.multiRemove(keys, (err) => {
        // // keys k1 & k2 removed, if they existed
        // // do most stuff after removal (if you want)
        // })
    }

    goToTabNavigatorScreen = () => {
        console.log('navigtion called ...... ')
        this.props.navigation.navigate('App')
    }

    render() {
        const { isLoading } = this.state
        if (isLoading) {
            return(
                <View style={[styles.container]}>
       
                    <ActivityIndicator size="large" color="#00ff00" />
                    
                </View>
            )
        } else {
            return(
                <View style={styles.authContainer}>
                    <View style={styles.authLogo}>
                        <AuthLogo/>
                    </View>
                    <View style={styles.authLogin}>
                        {/* <Text>
                            Login Heer
                        </Text> */}
                        <AuthLogin
                        goToTabNavigatorScreen={this.goToTabNavigatorScreen}
                        />
                    </View>
                    {/* <Button
                    onPress={()=>this.props.navigation.navigate("App")}
                    title="Go to Tab navigator"
                    >  
                    </Button> */}
                </View>
            )
        }
    }
}

function mapStateToProps(state){
    console.log('map state to props in index file of auth ==', JSON.stringify(state))
    return {
        user: state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({refreshToken}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    authContainer: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#17055D'
    },
    authLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authLogin: {
        flex: 1,
        alignItems: 'center'
    }
})