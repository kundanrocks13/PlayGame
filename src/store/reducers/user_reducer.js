import { SIGN_IN, SIGN_UP } from '../type'

export default function (state={}, action) {
    console.log(' reducer action type and payload --- ', action)
    switch(action.type) {
        case 'SIGN_IN':
            console.log('SIGN_IN REDUCER CALLED')
            return {
                ...state,
                auth:{
                    email: action.payload.email || false,
                    refreshToken: action.payload.refreshToken || false,
                    idToken: action.payload.idToken || false,
                    expiresIn: action.payload.expiresIn || false,
                    localId: action.payload.localId || false,   // uid
                }
            }
        case 'SIGN_UP':
                console.log('SIGN_UP REDUCER CALLED')
            return {
                ...state,
                auth:{
                    idToken : action.payload.idToken || false,
                    email : action.payload.email || false,
                    refreshToken : action.payload.refreshToken || false,
                    expiresIn : action.payload.expiresIn || false,
                    localId : action.payload.localId || false   // uid
                }
            }
        case 'REFRESH_TOKEN':
                console.log('REFRESH_TOKEN REDUCER CALLED')
                return {
                    ...state,
                    auth:{
                        id_token : action.payload.id_token || false,
                        user_id : action.payload.user_id || false,
                        refresh_token : action.payload.refresh_token || false,
                        expires_in : action.payload.expires_in || false,
                        project_id : action.payload.project_id || false,   // uid
                        token_type : action.payload.token_type || false
                    }
                }
        default:
            return state
    }
}