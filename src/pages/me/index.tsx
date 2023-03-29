import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useState, useEffect } from "react"
import { FormEvent } from "react"
import { destroyCookie, parseCookies } from "nookies"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { setUpApiClient } from '@/services/api'
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/react'


interface UserProps {
    id: string
    email: string
    name: string
    address: string
}

export default function Me() {
    const [name, setName] = useState('Loading...')
    const [address, setAddress] = useState('Loading...')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    // get data on first load
    useEffect(() => {
        async function getUserDetails() {
            const api = setUpApiClient({})
            const response = await api.get('/me')
            const user: UserProps = response.data

            setName(user.name)
            setAddress(user.address)

            if (!user.address) setAddress('')
        }

        getUserDetails()
    }, [])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const api = setUpApiClient({})

            await api.put('/user', {
                name,
                address
            })

            setLoading(false)
            toast.success('User updated succesfully')
        } catch (error) {
            toast.warn('Sorry there was an error try again later')
        }
    }

    const handleLogOut = () => {
        destroyCookie({}, '@barberProToken')
        router.push('/')
    }

    return (
        <>
            <main className={styles.bg}>
                <aside className={styles.asideContainer}>
                    <Navbar />
                </aside>
                <section className={styles.sectionContainer}>
                    <div className={styles.titleContainer}>
                        <h1>My Account</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Barber Shop name:
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Address:
                                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                            </label>
                            <button className={styles.saveBtn}>{loading ? (<Spinner />) : ('Save')}</button>
                            <button onClick={handleLogOut} type='button' className={styles.logOutBtn}>Log out</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx)
    const token = cookies['@barberProToken']

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}