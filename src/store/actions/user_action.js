import axios from 'axios'
import { SIGN_IN, SIGN_UP, REFRESH_TOKEN } from '../../utils/constant'
// import { SIGN_IN, SIGN_UP } from '../type'

export function signUp(payload) {
    const signUpResponse = axios({
        method : "POST",
        url : SIGN_UP,
        data : {
            email : payload.email,
            password : payload.password,
            returnSecureToken : true
        },
        headers : {
            "Content-Type" : "application/json"
        } 
    }).then(response=>{
        // console.log('sign up response ===== ', response.data.email)
        return response.data
    }).catch(error=>{
        console.warn(error)
    })

    return {
        type: 'SIGN_UP',
        payload: signUpResponse
    }
}

export function signIn(payload) {
    console.log("sign in Action called")
    const signInRespone = axios({
        method : 'POST',
        url : SIGN_IN,
        data : {
            email : payload.email,
            password : payload.password,
            returnSecureToken : true
        },
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(response=>{
        // console.warn('sign in response ==== ', response)
        return response.data
    }).catch(error=>{
        console.warn(error)
    })

    return {
        type: 'SIGN_IN',
        payload: signInRespone
    }
}

export function refreshToken(payload) {
    console.log('refresh token value ===== ',payload)
    const refreshTokenRes = axios({
        method: 'POST',
        url: REFRESH_TOKEN,
        data: {
            grant_type: 'refresh_token',
            refresh_token: payload
        },
        // data: 'grant_type=refresh_token&refresh_token='+ payload,
        
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response=>{
        console.log('refresh token response === >', response)
        return response
    }).catch(error=>{
        console.log(error)
    })

    return {
        type: 'REFRESH_TOKEN',
        payload: refreshTokenRes
    }
}