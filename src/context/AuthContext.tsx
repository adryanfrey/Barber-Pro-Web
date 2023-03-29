import { createContext, useState, useEffect, ReactNode } from "react";
import { setUpApiClient } from "@/services/api";
import { toast } from "react-toastify";
import {setCookie} from 'nookies'
import Router from "next/router";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextData {
    user: UserProps 
    signIn: (credentiasl: SignInProps) => Promise<void>
}

interface UserProps {
    id: string
    name: string
    email: string
    address: string | null
    token: string
}

interface SignInProps{
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){

    const api = setUpApiClient('')

    const [user, setUser] = useState<UserProps>({id: '', name: '', email: '', address: '', token: ''})
    
    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            
            setUser({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                address: response.data.address,
                token: response.data.token
            })

            setCookie(null, '@barberProToken', response.data.token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

            Router.push('/schedule')

        } catch (error: any) {
            const errorMessage = error.request.response

            if (errorMessage.includes('Email not')){
                toast.warn('User not found')
                return
            }

            if (errorMessage.includes('Incorret')){
                toast.warn('Incorret password')
                return
            }

            toast.warn('Sorry there was an error')
            console.log(error)
        }
    }

    return(
        <AuthContext.Provider value={{user, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}