import { LOGGED_IN_ROUTE, API_URL, SET_PROILE_LIST,SET_LOADER_FOR_PROFILE } from '../lib/Constants'
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
        dispatch(setState(SET_LOADER_FOR_PROFILE, true))
        fetch(API_URL+`people/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json()).then((data) => {
                let results = []
                for(let id in data.results){
                    let currentData = data.results[id]
                    currentData.id = id
                    results.push(currentData)
                }
                dispatch(setState(SET_PROILE_LIST, results))
            }).catch((err) => {
                console.log('err', err);
                dispatch(setState(SET_LOADER_FOR_PROFILE, false))

            });
        // await keyValueDB.deleteValueFromStore(LOGGED_IN_ROUTE)
    } catch (error) {
        dispatch(setState(SET_LOADER_FOR_PROFILE, false))
        console.log("error",error.message)
    }
}
}