import styles from './styles.module.sass'
import Navbar from '@/components/navbar/Navbar'
import { Switch } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiFillTag } from 'react-icons/ai'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { setUpApiClient } from '@/services/api'
import { Spinner } from '@chakra-ui/react'


interface ServiceProps {
    id: string
    name: string
    price: string | number
    status: boolean
}


export default function Services() {
    const [activeServicesList, setActiveServicesList] = useState<ServiceProps[]>()
    const [unActiveServices, setUnActiveServices] = useState<ServiceProps[]>()
    const [status, setStatus] = useState(true)

    const [loading, setLoading] = useState(true)
    const router = useRouter()



    // get data on first load
    useEffect(() => {
        async function getServices() {
            const api = setUpApiClient({})
            const response = await api.get('/services')
            const services: ServiceProps[] = response.data

            setActiveServicesList(services.filter(service => service.status === true))
            setUnActiveServices(services.filter(service => service.status === false))

            setLoading(false)
        }

        getServices()
    }, [])



    const handleActive = () => {
        if (status) {
            setStatus(false)
        } else {
            setStatus(true)
        }
    }

    return (
        <main className={styles.bg}>
            <aside className={styles.asideContainer}>
                <Navbar />
            </aside>
            <section className={styles.sectionContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.div1}>
                        <h1>Services</h1>
                        <button onClick={() => router.push('/newService')}>Register new</button>
                    </div>

                    <div className={styles.div2}>
                        <p>Actives</p>
                        <Switch className={styles.active} isChecked={status} size={'lg'} colorScheme={'green'} onChange={handleActive} />
                    </div>
                </div>
                <div className={styles.servicesContainer}>

                    {loading && <Spinner className={styles.spinner} color='#fba931' />}

                    {status ? (
                        activeServicesList?.length === 0 ? <p className={styles.noServices}>No services... Create a new service on the button 'Register new'</p> :
                            activeServicesList?.map((service) => (
                                <div onClick={() => router.push({ pathname: '/editService', query: { serviceName: service.name, servicePrice: service.price, serviceId: service.id, status: service.status } })} className={styles.service}>
                                    <p className={styles.serviceName}><AiFillTag size={30} color='#fba931 ' />{service?.name}</p>
                                    <p>${service?.price}</p>
                                </div>
                            ))
                    ) : (
                        unActiveServices?.length === 0 ? <p className={styles.noServices}>No unactive services...</p> :
                            unActiveServices?.map((service) => (
                                <div onClick={() => router.push({ pathname: '/editService', query: { serviceName: service.name, servicePrice: service.price, serviceId: service.id, status: service.status } })} className={styles.service}>
                                    <p className={styles.serviceName}><AiFillTag size={30} color='#fba931 ' />{service?.name}</p>
                                    <p>${service?.price}</p>
                                </div>
                            ))
                    )}
                </div>
            </section>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx)

    const token = cookies["@barberProToken"]

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