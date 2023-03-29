import axios from 'axios'
import { parseCookies } from 'nookies'

export function setUpApiClient(ctx: any){
    let cookies = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: 'https://barber-pro-backend.cyclic.app',
        headers: {
            Authorization: `Bearer ${cookies['@barberProToken']}`
        }
    })

    return api
}