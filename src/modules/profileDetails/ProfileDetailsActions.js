
import { SET_LOADER_FOR_PROFILE_VIEW, SET_PROFILE_DETAILS_LIST } from '../../lib/Constants'
import { setState } from '../GlobalAction'
import { ProfileDetails } from '../../services/ProfileDetailService'

export function addNewPostInProfileList(id, params, profilePostList, data) {
    return async function (dispatch) {
        try {
            dispatch(setState(SET_LOADER_FOR_PROFILE_VIEW, true))
            let cloneProfileList = await ProfileDetails.addNewPostInList(id, params, profilePostList, data)
            dispatch(setState(SET_PROFILE_DETAILS_LIST, cloneProfileList))
        } catch (error) {
            console.log("error", error.message)
        }
    }
}
export function getProfileDetailsList(params) {
    return async function (dispatch) {
        try {
            dispatch(setState(SET_LOADER_FOR_PROFILE_VIEW, true))
            let profileList = params.profileListObject[params.profileId].list
            dispatch(setState(SET_PROFILE_DETAILS_LIST, profileList))
        } catch (error) {
            console.log("error", error.message)
        }
    }
}

export function deletePostFormProfileItem(id, profilePostList, params) {
    return async function (dispatch) {
        try {
            dispatch(setState(SET_LOADER_FOR_PROFILE_VIEW, true))
            let cloneProfileList = await ProfileDetails.onDeleteItemFromPostList(id, profilePostList, params)
            dispatch(setState(SET_PROFILE_DETAILS_LIST, cloneProfileList))
        } catch (error) {
            console.log("error", error.message)
        }
    }
}