import { TYM_LINE_PROFILE_LIST, TYM_LINE_SIZE } from '../lib/Constants'
import { keyValueDB } from '../lib/DbServices'


class ProfileListService {

    async onPostPressInProfile(profilename, id, userId) {
        let tymLineObject = await keyValueDB.getValueFromStore(TYM_LINE_PROFILE_LIST), tymLineSize
        if (Number.isInteger(id)) {
            tymLineSize = id
        } else {
            tymLineSize = await keyValueDB.getValueFromStore(TYM_LINE_SIZE)
            tymLineSize = tymLineSize && tymLineSize.value ? tymLineSize.value + 1 : 1
        }
        tymLineObject = tymLineObject && tymLineObject.value ? tymLineObject.value : {}
        tymLineObject[userId] = tymLineObject[userId] ? tymLineObject[userId] : {}
        tymLineObject[userId][tymLineSize] = { id: tymLineSize, name: profilename, list: [] }
        keyValueDB.saveDataInStore(TYM_LINE_PROFILE_LIST, tymLineObject)
        keyValueDB.saveDataInStore(TYM_LINE_SIZE, tymLineSize)
        return tymLineObject[userId]
    }


    async onDeleteItemFromProfileList(id, userId) {
        let tymLineObject = await keyValueDB.getValueFromStore(TYM_LINE_PROFILE_LIST)
        tymLineObject = tymLineObject && tymLineObject.value ? tymLineObject.value : {}
        if (tymLineObject[userId][id]) {
            delete tymLineObject[userId][id]
        }
        keyValueDB.saveDataInStore(TYM_LINE_PROFILE_LIST, tymLineObject)
        return tymLineObject[userId]
    }

}

export let ProfileService = new ProfileListService()