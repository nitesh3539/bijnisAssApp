import { LOGGED_IN_ROUTE, API_URL } from '../lib/Constants'
import { keyValueDB } from '../lib/DbServices'
import { navigate } from '../lib/NavigationServices';

export function setState(type, payload) {
    return { type, payload }
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

export function getPokemonList(){
    return async function(dispatch){
    try {
        fetch(API_URL+`pokemon/1/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json()).then((data) => {
                return (data);
            }).catch((err) => {
                console.log('err', err);
            });
        // await keyValueDB.deleteValueFromStore(LOGGED_IN_ROUTE)
    } catch (error) {
        console.log("error",error.message)
    }
}
}