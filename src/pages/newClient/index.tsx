import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useEffect, useState } from "react"
import { FormEvent } from "react"
import { parseCookies } from "nookies"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import { setUpApiClient } from '@/services/api'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'


interface ServiceProps {
    id: string
    name: string
    status: boolean
    price: number
}

interface BarberProps {
    id: string
    name: string
    status: boolean
}

export default function NewClient() {
    const [clientName, setClientName] = useState('')
    const [selectedBarber, setSelectedBarber] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [schedule, setSchedule] = useState('')
    const [time, setTime] = useState('Now')
    const [servicesList, setServicesList] = useState<ServiceProps[]>()
    const [barbersList, setBarbersList] = useState<BarberProps[]>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    // get data on first load
    useEffect(() => {
        async function getData() {
            const api = setUpApiClient({})
            const response = await api.get('/services')
            const response2 = await api.get('/barber')

            const services: ServiceProps[] = response.data
            const barbers: BarberProps[] = response2.data

            setSelectedService(services[0]?.id)
            setSelectedBarber(barbers[0]?.id)
            setServicesList(services.filter(service => service.status === true))
            setBarbersList(barbers.filter(barber => barber.status === true))
        }

        getData()
    }, [])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const api = setUpApiClient({})
        setLoading(true)

        // handle Date  
        const date = new Date()

        if (time !== 'Now') {
            let splitTime = time.split(':')
            date.setHours(Number(splitTime[0]), Number(splitTime[1]))
        }

        if (schedule !== '') {
            let splitSchedule = schedule.split('-')
            date.setFullYear(Number(splitSchedule[0]), Number(splitSchedule[1]) - 1, Number(splitSchedule[2]))
        }

        const dateString = date.toLocaleString()

        // check if the user has created services and added barbers to the system
        if (servicesList?.length === 0 || barbersList?.length === 0) {
            toast.warn('You need to first complete your account settings to start adding clients')
            setLoading(false)
            return 
        }

        try {
            await api.post('/client', {
                name: clientName,
                service_id: selectedService,
                schedule: dateString,
                barber_id: selectedBarber
            })

            toast.success('Client added to your schedule successfully')
        } catch (error) {
            console.log(error)
            toast.warn('Sorry there was an error try again later')
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
                        <h1>New Client</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Client's name:
                                <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} />
                            </label>

                            <label>
                                Barber's name:
                                <select value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value)}>
                                    {barbersList?.map((barber) => (
                                        <option value={barber.id} key={barber.id}>{barber.name}</option>
                                    ))}
                                </select>
                                {barbersList?.length === 0 && <p className={styles.noServices}>Add a Barber on the barbers section to start adding clients to your schedule</p>}
                            </label>

                            <label>
                                Service:
                                <select required value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>\
                                    {servicesList?.map((service) => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                                {servicesList?.length === 0 && <p className={styles.noServices}>Create a service on the services section to start adding clients to your schedule</p>}
                            </label>

                            <label className={styles.dateInput}>
                                Schedule:
                                <input type="date" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                                <p>If not selected, it will be today by default</p>
                            </label>

                            <label className={styles.dateInput}>
                                Time:
                                <select value={time} onChange={(e) => setTime(e.target.value)}>
                                    <option>Now</option>
                                    <option>8:30</option>
                                    <option>9:00</option>
                                    <option>9:30</option>
                                    <option>10:00</option>
                                    <option>10:30</option>
                                    <option>11:00</option>
                                    <option>11:30</option>
                                    <option>12:00</option>
                                    <option>12:30</option>
                                    <option>13:00</option>
                                    <option>13:30</option>
                                    <option>14:00</option>
                                    <option>14:30</option>
                                    <option>15:00</option>
                                    <option>15:30</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                    <option>20:30</option>
                                </select>
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