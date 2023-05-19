import { createContext, useState, ReactNode } from "react";
import { setUpApiClient } from "@/services/api";
import { toast } from "react-toastify";
import {setCookie} from 'nookies'
import Router from "next/router";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextData {
    signIn: (credentiasl: SignInProps) => Promise<void>
}

interface SignInProps{
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){

    const api = setUpApiClient('')
    
    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/session', {
                email,
                password
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
        <AuthContext.Provider value={{signIn}}>
            {children}
        </AuthContext.Provider>
    )
}