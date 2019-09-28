import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../utils/form/input'
import ValidationForm from '../../utils/form/validationForm'
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUp, signIn } from '../../store/actions/user_action'
import {setTokens} from '../../utils/constant'

class AuthLogin extends React.Component {
    
    state = {
        validationMsg: false,

        type: 'Login',
        action: 'Login',
        actionMode: 'I want to register',
        hasError: false,
        form:{
            email:{
                value:"",
                valid:false,
                type:"textInput",
                rules:{
                    isRequired: true,
                    isEmail: true
                }
            },
            password:{
                value: "",
                valid: false,
                type: "textInput",
                rules:{
                    isRequired: true,
                    minLength: 6
                }
            },
            confirmPassword:{
                value: "",
                valid: false,
                type: "textInput",
                rules:{
                    confirmPass: 'password',
                }
            }
        }
    }

    confirmPassword = () => {
        return (
            this.state.type == "Login" ?
            <TextInput
                placeholder={"Confrim Password"}
                placeholderTextColor="white"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                keyboardType={"default"}
                borderBottomColor= 'white'
                borderBottomWidth={ 2}
                overrideStyle={{borderRadius:7, width: 250, height: 40, borderWidth: 0, color:"white"}}
                onChangeText={(value) => this.onChange(value, "confirmPassword")}
                secureTextEntry
            /> :
             null
        ) 
    }

    onChange = (value, name) => {
        this.setState({
            hasError: false
        })

        let formCopy = this.state.form
        formCopy[name].value = value

        let rules = formCopy[name].rules
        let valid = ValidationForm(value, rules, formCopy)

        // console.log('validate form ---- ', valid)

        if(valid) {
            this.setState({hasError: false})
        } else {
            this.setState({hasError: true})
        }

        this.setState({
            form : formCopy
        })
    }

    formHasErrors = () => {
        // add some red error styles here
        // console.log('has error value --- ', this.state.hasError)
        this.setState({})
    }

    actionMode = () => {
        const type = this.state.type
        this.setState({
            type : type == 'Login' ? "SignUp" : 'Login',
            action : type == 'Login' ? "SignUp" : 'Login',
            actionMode :  type == 'Login' ? 'I want to Login':  "I want to register"

        })
    }

    manageAccess = (response) => {
        console.log('manage access called', response)  //  because of Javascript is Async lang. so before getting is mapStateToProps, I rcvs response thats't why for condition i use only
        if(!response.payload.localId) { // in video -> !this.props.user.auth.uid
            console.log("if part...")
            this.setState({hasError : true})
        } else {
            console.log('else part executed ---- ')
            setTokens(response.payload, ()=>{
                this.setState({hasError : false})
                console.log('navigation first called ............. ')
                // this.props.navigation.navigate('App')
                this.props.goToTabNavigatorScreen()
            })
        }
    }

    submitForm = () => {
        // console.warn('submit called ---- ')
        let isFormValid = true
        let submitFormObject = {}

        const formCopy = this.state.form    // u face issue here
        for(let key in formCopy) {
            // console.log('0-----', key)
            if(this.state.type === 'Login') {
                if(key != "confirmPassword") {
                    isFormValid = isFormValid && formCopy[key].valid
                    submitFormObject[key] = formCopy[key].value
                    console.log('1')
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid
                submitFormObject[key] = formCopy[key].value
                console.log('2')
            }
        }

        if(this.state.type === "SignUp") {
            console.log('sign up called')
            // this.setState({validationMsg: this.state.hasError})
            this.props.signUp(submitFormObject).then((response)=>{
                console.log('sign up manage Access called ===>',response)
               this.manageAccess(response)
            })
        } else {
            console.log('login called')
            this.props.signIn(submitFormObject).then((response)=>{
                console.log('login manage Access called')
                this.manageAccess(response)
            })
        }

    }

    goToTabNavigatorScreen = () => {
        this.props.goToTabNavigatorScreen()
    }

    render(){
        return(
            <View>
                <View style={{marginBottom: 7}} >
                    <TextInput
                        placeholder={"Enter Email"}
                        placeholderTextColor="white"
                        type={this.state.form.email.type}
                        value={this.state.form.email.value}
                        keyboardType={"email-address"}
                        borderBottomColor= 'white'
                        borderBottomWidth={2}
                        overrideStyle={{borderRadius:7, width: 250, height: 40,borderWidth: 0, color:"white"}}
                        onChangeText={(value) => this.onChange(value, "email")}
                    />
                </View>
                <View style={{marginBottom: 5}} >
                    <TextInput
                        placeholder={"Enter Password"}
                        placeholderTextColor="white"
                        type={this.state.form.password.type}
                        value={this.state.form.password.value}
                        keyboardType={"default"}
                        borderBottomColor= 'white'
                        borderBottomWidth={ 2}
                        overrideStyle={{borderRadius:7, width: 250, height: 40, borderWidth: 0, color:"white"}}
                        onChangeText={(value) => this.onChange(value, "password")}
                        secureTextEntry
                    />
                </View>

                <View style={{marginBottom: 5}}>
                {this.confirmPassword()}
                </View>

                {
                    this.state.validationMsg ? 
                        <View>  
                            <Text style={{color: 'white'}}>
                                Oops, check your inputs
                            </Text>
                        </View> :
                    null
                }

                <View style={{marginBottom: 5}}>
                    <Button
                        title={this.state.action}
                        onPress={this.submitForm}
                        // color="transparent"
                    />
                </View>

                <View  style={{marginBottom: 5}}>
                    <Button
                        title={this.state.actionMode}
                        onPress={this.actionMode}
                    />
                </View>
                <View style={{marginBottom: 5}}>
                    <Button
                        title="I'll do it Later..."
                        onPress={this.goToTabNavigatorScreen}
                    />
                </View>
                
                
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.warn('map state to props --1-- ', JSON.stringify(state))
    return {
        userInfo: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signIn, signUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin)