import {useCallback, useEffect, useState} from "react";
import {getCookie} from "../helpers";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
        /*document.cookie = `token=${token};max-age=${60*60*24*30}; path=/;`
        document.cookie = `userId=${userId};max-age=${60*60*24*30}; path=/;`*/
    }, []);
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)

        /*document.cookie = 'token=; Max-Age=0'
        document.cookie = 'userId=; Max-Age=0'*/
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        /*const dataToken = getCookie('token')
        const dataUserId = getCookie('userId')*/
        if (data) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login]);


    return {login, logout, token, userId, ready}
}