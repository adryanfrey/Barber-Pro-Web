import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useState, useContext } from "react"
import { AuthContext } from '@/context/AuthContext'
import { FormEvent } from "react"
import { setUpApiClient } from '@/services/api'
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import {  parseCookies } from "nookies"


export default function Me() {
    const { signOut, user } = useContext(AuthContext) 

    const [name, setName] = useState(user.name)
    const [address, setAddress] = useState(user.address)
    const [loading, setLoading] = useState(false)

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
        signOut()
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

// check user Authentication 
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)

    if (!cookies['@barberProToken']) {
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
