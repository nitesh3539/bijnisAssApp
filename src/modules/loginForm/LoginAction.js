import { SET_LOADER_FOR_LOGIN, SET_LOGIN_ERROR_MESSAGE, RESET_STATE_FOR_LOGIN , LOGGED_IN_ROUTE } from '../../lib/Constants'
import { keyValueDB } from '../../lib/DbServices'
import { setState } from '../GlobalAction'
import { navigate } from '../../lib/NavigationServices'
import { LoginFormService } from '../../services/LoginServices'

export function onLogInButtonPressed(username, password, buttonName) {
    return async function (dispatch) {
        try {
            dispatch(setState(SET_LOADER_FOR_LOGIN, true))
            await LoginFormService.onStartLogin(username, password, buttonName)
            dispatch(setState(RESET_STATE_FOR_LOGIN))
        } catch (error) {
            dispatch(setState(SET_LOGIN_ERROR_MESSAGE, error.message))  
        }
    }
}

export function initialLoadAction() {
    return async function (dispatch) {
        try {
            let loggedInRoute = await keyValueDB.getValueFromStore(LOGGED_IN_ROUTE)
            if(loggedInRoute && loggedInRoute.value){
                navigate('ProfileView', {userId : loggedInRoute.value})
            }else{
                navigate('LoginForm')
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }
}