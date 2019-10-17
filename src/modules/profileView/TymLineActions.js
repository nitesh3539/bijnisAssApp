
import { LOGGED_IN_ROUTE, ON_POST_PRESS, SET_TYME_LINE_LIST, SET_LOADER_FOR_TYMLINE, TYM_LINE_SIZE, TYM_LINE_PROFILE_LIST } from '../../lib/Constants'
import { setState } from '../GlobalAction'
import { keyValueDB } from '../../lib/DbServices'
import { navigate } from '../../lib/NavigationServices';
import { ProfileService } from '../../services/ProfileListService'

export function getTymLineProfileList(params){
    return async function(dispatch){
        try {
            dispatch(setState(SET_LOADER_FOR_TYMLINE, true))
            let tymLineObject = await keyValueDB.getValueFromStore(TYM_LINE_PROFILE_LIST)
            tymLineObject = tymLineObject && tymLineObject.value && tymLineObject.value[params.userId] ? tymLineObject.value[params.userId] : {}
            dispatch(setState(SET_TYME_LINE_LIST, tymLineObject))
        } catch (error) {
            console.log("error",error.message)
        }
    }
}
export function setListOnPostPress(profilename, id, userId){
    return async function(dispatch){
        try {
            dispatch(setState(SET_LOADER_FOR_TYMLINE, true))
            let tymLineObject = await ProfileService.onPostPressInProfile(profilename, id, userId)
            dispatch(setState(ON_POST_PRESS, tymLineObject))
        } catch (error) {
            console.log("error",error.message)
        }
    }
}


export function deleteProfileFormList(id, userId){
    return async function(dispatch){
        try {
            dispatch(setState(SET_LOADER_FOR_TYMLINE, true))
            let tymLineObject = await ProfileService.onDeleteItemFromProfileList(id, userId)
            dispatch(setState(SET_TYME_LINE_LIST, tymLineObject))
        } catch (error) {
            console.log("error",error.message)
        }
    }
}


export function onLogoutPress(){
    return async function(dispatch){
        try {
            await keyValueDB.deleteValueFromStore(LOGGED_IN_ROUTE)
            navigate('LoginForm')
        } catch (error) {
            console.log("error",error.message)
        }
    }
}

