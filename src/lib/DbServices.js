
'use strict'
import store from 'react-native-simple-store'


class keyValueDb {

    getValueFromStore(schemaName) {
        const value = store.get(schemaName);
        return value;
    }


    deleteValueFromStore(schemaName) {
        return store.delete(schemaName)
            .then(() => {
                return true;
            }).catch(error => {
                return error
            })
    }

    saveDataInStore(schemaName, value){
        if (value && schemaName) {
            return store.save(schemaName, {
              value
            }).then(() => {
              return true;
            }).catch(error => {
              return error;
            })
        }
    }

}
export let keyValueDB = new keyValueDb()
