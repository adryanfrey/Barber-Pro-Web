import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useState } from "react"
import { FormEvent } from "react"
import { parseCookies } from "nookies"
import { GetServerSidePropsContext } from "next"
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import { setUpApiClient } from '@/services/api'
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/react'

export default function NewService() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const api = setUpApiClient({})
        setLoading(true)

        try {

            await api.post('/service', {
                name,
                price: Number(price)
            })

            toast.success('Service Registered successfully')
            setName('')
            setPrice('')
        } catch (error) {
            toast.warn('Sorry there was an error try again later')
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <>
            <main className={styles.bg}>
                <aside className={styles.asideContainer}>
                    <Navbar />
                </aside>
                <section className={styles.sectionContainer}>
                    <div className={styles.titleContainer}>
                        <button onClick={router.back}><IoIosArrowBack size={20} className={styles.icon} />Back</button>
                        <h1>New Service</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Service Name:
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Price:
                                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
                            </label>

                            <button disabled={loading} className={styles.saveBtn}>
                                {loading ? (<Spinner />) : ('Register')}
                            </button>
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