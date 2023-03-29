import axios from 'axios'
import { parseCookies } from 'nookies'

export function setUpApiClient(ctx: any){
    let cookies = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@barberProToken']}`
        }
    })

    return api
}