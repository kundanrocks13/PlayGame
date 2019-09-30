import AsyncStorage from '@react-native-community/async-storage'

export const FIREBASE_URL = `play-game-464d1.firebaseapp.com`;  // authDomain
export const API_KEY = `AIzaSyChJF54PFEGJSa7wJYsISwLOpDZFgEYofQ`;
export const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const REFRESH_TOKEN = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const setTokens = async (asyncSetValue, callBackFunc) => {
    console.log('set Tokens value ==== ', JSON.stringify(asyncSetValue))
    const dateNow = new Date()
    const expiration_Token = dateNow.getTime() + (3600 * 1000)
    
    const id_Token = asyncSetValue.idToken
    const refresh_Token = asyncSetValue.refreshToken
    const local_Id = asyncSetValue.localId

    // console.log("last value === ",expiration_Token)
    // const idToken = ["@play_game@id_Token", id_Token]
    // const refreshToken = ["@play_game@refresh_Token", refresh_Token]
    // const localId = ["@play_game@local_Id", local_Id]
    // const expirationToken = ["@play_game@expiration_Token", expiration_Token]

    try {
        await AsyncStorage.setItem("@play_game@id_Token",id_Token)
        await AsyncStorage.setItem("@play_game@refresh_Token",refresh_Token)
        await AsyncStorage.setItem("@play_game@local_Id", local_Id)
        // await AsyncStorage.setItem("@play_game@expiration_Token", expiration_Token)
        callBackFunc()
    } catch(e) {
        console.log("error == ", e)
        //save error
    }
    
      console.log("Done.")
}

export const getTokens = async (callBackFunc) => {
    let values = []

    try {
        values1 = await AsyncStorage.getItem("@play_game@id_Token")
        values2 = await AsyncStorage.getItem("@play_game@refresh_Token")
        values3 = await AsyncStorage.getItem("@play_game@local_Id")
        // values.push(values1,values2,values3)
        callBackFunc(values2)
        // values4 = await AsyncStorage.getItem("@play_game@expiration_Token")
    } catch(e) {
        console.log('error ---- >', e)
        // read error
    }
}