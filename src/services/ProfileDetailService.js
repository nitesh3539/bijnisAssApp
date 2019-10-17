import { TYM_LINE_PROFILE_LIST, TYM_LINE_SIZE } from '../lib/Constants'
import { keyValueDB } from '../lib/DbServices'


class ProfileDetailService {

    async addNewPostInList(id, params, profilePostList, data) {
        let cloneProfileList = JSON.parse(JSON.stringify(profilePostList)), nextData, currentData = cloneProfileList[id + 1]
        let tymLineObject = await keyValueDB.getValueFromStore(TYM_LINE_PROFILE_LIST)
        if (!data.editable) {
            for (let count = id + 1; count <= profilePostList.length - 1; count++) {
                nextData = cloneProfileList[count + 1]
                cloneProfileList[count + 1] = currentData
                cloneProfileList[count + 1].id = count + 1
                currentData = nextData
            }
        }
        cloneProfileList[id + 1] = { id: id + 1, content: data.content, title: data.title }
        tymLineObject = tymLineObject && tymLineObject.value ? tymLineObject.value : {}
        tymLineObject[params.userId][params.profileId].list = cloneProfileList
        await keyValueDB.saveDataInStore(TYM_LINE_PROFILE_LIST, tymLineObject)
        return cloneProfileList
    }


    async onDeleteItemFromPostList(id, profilePostList, params) {
        let cloneProfileList = JSON.parse(JSON.stringify(profilePostList))
        for (let count = id; count < profilePostList.length - 1; count++) {
            cloneProfileList[count] = cloneProfileList[count + 1]
            cloneProfileList[count].id = count
        }
        cloneProfileList.pop()
        let tymLineObject = await keyValueDB.getValueFromStore(TYM_LINE_PROFILE_LIST)
        tymLineObject = tymLineObject && tymLineObject.value ? tymLineObject.value : {}
        tymLineObject[params.userId][params.profileId].list = cloneProfileList
        keyValueDB.saveDataInStore(TYM_LINE_PROFILE_LIST, tymLineObject)
        return cloneProfileList
    }

}

export let ProfileDetails = new ProfileDetailService()