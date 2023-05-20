import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'

export function setUpApiClient(ctx: any){
    let cookies = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: 'https://barber-pro-backend.cyclic.app',
        headers: {
            Authorization: `Bearer ${cookies['@barberProToken']}`
        }
    })

    // handle 401 error
    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response?.status === 401){
           if (typeof window !== undefined) {
                destroyCookie({}, '@barberProToken')
                Router.push('/')
           } else {
             return Promise.reject(error)
           }
        }

        return Promise.reject(error)
    })

    return api
}