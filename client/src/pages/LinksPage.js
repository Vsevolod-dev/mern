import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Loader from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp()

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
            console.log(e)
        }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    );
};