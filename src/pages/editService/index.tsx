import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useState } from "react"
import { FormEvent } from "react"
import { parseCookies } from "nookies"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { Switch } from '@chakra-ui/react'
import { IoIosArrowBack } from 'react-icons/io'
import { setUpApiClient } from '@/services/api'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'


export default function NewService() {
    const router = useRouter()
    const {serviceName, servicePrice, serviceId, status} = router.query
    const boolean = (status === 'true')

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [name, setName] = useState(serviceName)
    const [price, setPrice] = useState(servicePrice)
    const [serviceStatus, setServiceStatus] = useState<boolean>(!boolean)


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const api = setUpApiClient({})
        setLoading(true)

        try {
            await api.put('/service', {
                service_id: serviceId,
                name,
                price: Number(price),
                status: !serviceStatus
            })
            toast.success('Service changed successfully')
        } catch (error) {
            toast.warn('Sorry there was an error try again later')
            console.log(error)
        }

        setLoading(false)
    }

    const handleDisable = () => {
        if (serviceStatus){
            setServiceStatus(false)
        } else {
            setServiceStatus(true)
        }
    }

    const handleDelete = async () => {
        const api = setUpApiClient({})
        setDeleteLoading(true)

        try {
            await api.delete('/service', {
                params: {
                    service_id: serviceId
                }
            })
            toast.success('Service deleted succesfully')
            router.back()
        } catch (error) {
            console.log(error)
            toast.warn('Sorry there was an error try again later')
        }
        setDeleteLoading(false)
    }

    return (
        <>
            <main className={styles.bg}>
                <aside className={styles.asideContainer}>
                    <Navbar />
                </aside>
                <section className={styles.sectionContainer}>
                    <div className={styles.titleContainer}>
                        <button onClick={() => router.back()}><IoIosArrowBack size={20} className={styles.icon}/>Back</button>
                        <h1>Edit Service</h1>
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

                            <label className={styles.disableContainer}>
                                Disable service 
                                <Switch className={styles.switch} size={'lg'} colorScheme={'red'} isChecked={serviceStatus} onChange={handleDisable}/>
                            </label>
                           
                            <button disabled={loading} className={styles.saveBtn}>
                                {loading? (<Spinner />) : ('Save')}
                            </button>

                            <button type='button' disabled={deleteLoading} onClick={handleDelete} className={styles.deleteBtn}>
                                {deleteLoading? (<Spinner />) : ('Delete')}
                            </button>
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