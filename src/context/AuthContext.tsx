import { createContext, ReactNode, useState, useEffect } from "react";
import { setUpApiClient } from "@/services/api";
import { toast } from "react-toastify";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from "next/router";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextData {
    signIn: (credentiasl: SignInProps) => Promise<void>
    signOut: () => void
    user: UserProps
}

interface SignInProps {
    email: string
    password: string
}

interface UserProps {
    name: string
    email: string
    address: string
    token: string
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
    const api = setUpApiClient('')

    // user data
    const [user, setUser] = useState({} as UserProps)

    // check if token is valid && update user details on reload
    useEffect(() => {
        const cookies = parseCookies()

        if (cookies['@barberProToken']) {
            //get user details 
            api.get('/me')
                .then((response) => {
                    const { email, name, address, token } = response.data
                    setUser({ email, name, address, token })
                })
                .catch((error) => {
                    signOut()
                })
        }
    }, [])

    // login 
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password,
            })
            
            const {name, address, token} = response.data

            setCookie(null, '@barberProToken', token, {
                maxAge: 60 * 60 * 24 * 30, 
                path: '/'
            })

            setUser({
                name,
                email,
                address,
                token
            })

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Router.push('/schedule')

        } catch (error: any) {
            const errorMessage = error.request.response

            if (errorMessage.includes('Email not')) {
                toast.warn('User not found')

            } else if (errorMessage.includes('Incorret')) {
                toast.warn('Incorret password')

            } else {
                toast.warn('Sorry there was an error')
                console.log(error)
            }
        }
    }

    // signOut
    async function signOut() {
        destroyCookie({}, '@barberProToken')
        Router.push('/')
    }
    return (
        <AuthContext.Provider value={{ signIn, user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}