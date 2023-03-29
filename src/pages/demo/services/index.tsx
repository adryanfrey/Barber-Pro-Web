import styles from './styles.module.sass'
import Navbar from '@/components/demo/navbar'
import { Switch } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiFillTag } from 'react-icons/ai'
import { useRouter } from 'next/router'


interface ServiceProps {
    id: string
    name: string
    price: string | number
    status: boolean
}

export default function Services() {
    const [activeServicesList, setActiveServicesList] = useState<ServiceProps[]>([
        {
            id: '1',
            name: 'Haircut',
            price: 20,
            status: true
        },
        {
            id: '2',
            name: 'Beard',
            price: 15,
            status: true
        },
        {
            id: '3',
            name: 'Haircut & Beard',
            price: 30,
            status: true
        }
    ])
    const [unActiveServices, setUnActiveServices] = useState<ServiceProps[]>([
        {
            id: '4',
            name: 'Paint Hair',
            price: 40,
            status: false
        }
    ])



    const [status, setStatus] = useState(true)
    const router = useRouter()

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
                        <h1>Haircuts Models</h1>
                        <button onClick={() => router.push('/demo/newService')}>Register new</button>
                    </div>

                    <div className={styles.div2}>
                        <p>Actives</p>
                        <Switch className={styles.active} isChecked={status} size={'lg'} colorScheme={'green'} onChange={handleActive} />
                    </div>
                </div>
                <div className={styles.servicesContainer}>
                    {status ? (
                        activeServicesList?.length === 0 ? <p className={styles.noServices}>No services... Create a new service on the button 'Register new'</p> :
                            activeServicesList?.map((service) => (
                                <div onClick={() => router.push({ pathname: '/demo/editService', query: { serviceName: service.name, servicePrice: service.price, serviceId: service.id, status: service.status } })} className={styles.service}>
                                    <p className={styles.serviceName}><AiFillTag size={30} color='#fba931 ' />{service?.name}</p>
                                    <p>${service?.price}</p>
                                </div>
                            ))
                    ) : (
                        unActiveServices?.length === 0 ? <p className={styles.noServices}>No unactive services...</p> :
                            unActiveServices?.map((service) => (
                                <div onClick={() => router.push({ pathname: '/demo/editService', query: { serviceName: service.name, servicePrice: service.price, serviceId: service.id, status: service.status } })} className={styles.service}>
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