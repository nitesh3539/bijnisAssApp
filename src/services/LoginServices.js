import { USERNAME_PASSWORD_STORE, LOGGED_IN_ROUTE } from '../lib/Constants'
import { navigate } from '../lib/NavigationServices'
import { keyValueDB } from '../lib/DbServices'


class LoginService {

    async onStartLogin(username, password, buttonName) {
        let usernamePasswordValue = await keyValueDB.getValueFromStore(USERNAME_PASSWORD_STORE)
        usernamePasswordValue = usernamePasswordValue && usernamePasswordValue.value ? usernamePasswordValue.value : {}
        if (!username || !password) {
            throw new Error('Username or Password should not be empty')
        }
        if (buttonName == 'Create Account') {
            if (usernamePasswordValue[username]) {
                throw new Error('Username Already Exit')
            } else {
                usernamePasswordValue[username] = password
                await keyValueDB.saveDataInStore(LOGGED_IN_ROUTE, username)
                keyValueDB.saveDataInStore(USERNAME_PASSWORD_STORE, usernamePasswordValue)
                navigate('ProfileView', { userId: username })
            }
        } else {
            if (usernamePasswordValue[username] == password) {
                await keyValueDB.saveDataInStore(LOGGED_IN_ROUTE, username)
                navigate('ProfileView', { userId: username })
            } else {
                throw new Error('Username or Password is incorrect')
            }
        }
    }

}

export let LoginFormService = new LoginService()