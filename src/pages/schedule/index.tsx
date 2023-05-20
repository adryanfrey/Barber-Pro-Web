import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { BsFillPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { setUpApiClient } from '@/services/api'
import { useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import ScheduleModal from '@/components/scheduleModal'
import { ClientDataProps } from '@/components/scheduleModal'
import { AiOutlineCheck } from 'react-icons/ai'
import ConcludeClient from '@/components/concludeClientModal'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

interface ServiceProps {
    name: string
    id: string
    price: string | number
    status: boolean
}

interface BarberProps {
    name: string
    id: string
}

interface ClientsProps {
    id: string
    name: string
    schedule: string
    user_id: string
    service_id: string
    status: boolean
    service: ServiceProps
    barber: BarberProps
}

export default function Schedule() {

    // clients states
    const [clients, setClients] = useState<ClientsProps[]>([])
    const [clientsToday, setClientsToday] = useState<ClientsProps[]>()
    const [clientsTomorrow, setClientsTomorrow] = useState<ClientsProps[]>()
    const [searchClients, setSearchClients] = useState<ClientsProps[]>()

    // other states
    const [date, setDate] = useState('')
    const [newDateFormat, setNewDateFormat] = useState('')
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)

    // router
    const router = useRouter()

    // get Data on first load
    useEffect(() => {
        async function getClients() {
            const api = setUpApiClient({})
            const response = await api.get('/clients')

            setClients(response.data)
            const clients: ClientsProps[] = response.data

            // sort clients 
            const clientsSorted = clients.sort((a, b) => {

                // get the time of A
                const timeA = a.schedule.slice(11, 17)
                const timeASplit = timeA.split(':')
                const timeANumber = Number(timeASplit.join(''))

                // get the time of B
                const timeB = b.schedule.slice(11, 17)
                const timeBSplit = timeB.split(':')
                const timeBNumber = Number(timeBSplit.join(''))

                return timeANumber - timeBNumber
            })

            // get the date from today
            const dateToday = new Date()
            const today = `${dateToday.getDate().toString().padStart(2, "0")}/${(dateToday.getMonth() + 1).toString().padStart(2, "0")}/${dateToday.getFullYear()}`

            // set clients from today
            const clientsTodayList = clientsSorted.filter(client => client.schedule.includes(today))
            setClientsToday(clientsTodayList)

            // get the date from tomorrow
            const dateTomorrow = new Date()
            dateTomorrow.setDate(dateTomorrow.getDate() + 1)
            const tomorrow = `${dateTomorrow.getDate().toString().padStart(2, "0")}/${(dateTomorrow.getMonth() + 1).toString().padStart(2, "0")}/${dateTomorrow.getFullYear()}`


            // set clients for tomorrow
            const clientsTomorrowList = clientsSorted.filter(client => client.schedule.includes(tomorrow))
            setClientsTomorrow(clientsTomorrowList)


            setLoading(false)
        }

        getClients()
    }, [modalVisible, modalVisible2])


    // search for clients in a specific date
    useEffect(() => {

        if (date) {
            // handle date format
            const dateSplit = date.split('-')
            const reverse = dateSplit.reverse()
            const newDateFormat = reverse.join('/')
            setNewDateFormat(newDateFormat)

            setSearchClients(clients?.filter((client) => {
                return client.schedule.slice(0, 10).includes(newDateFormat)
            }))
        } else {
            setSearchClients(undefined)
        }

    }, [date])

    // clear data

    const handleClear = () => {
        setDate('')
        setSearchClients(undefined)
    }



    // close Modal
    const handleModalView = () => {
        setModalVisible(false)
    }

    // close modal 2
    const handleCloseModal2 = () => {
        setModalVisible2(false)
    }


    // pass props to the modal
    const [clientName, setClientName] = useState('')
    const [clientId, setClientId] = useState('')
    const [clientSchedule, setClientSchedule] = useState('')
    const [clientServiceId, setClientServiceId] = useState('')
    const [clientBarberId, setClientBarberId] = useState('')
    const [clientTime, setClientTime] = useState('')

    const clientData = {
        id: clientId,
        name: clientName,
        schedule: clientSchedule,
        serviceId: clientServiceId,
        barberId: clientBarberId,
        time: clientTime,
        status: true
    }

    const handleOpenModal = ({ id, name, schedule, serviceId, barberId, time, status }: ClientDataProps) => {
        if (!status) {
            setClientId(id)
            setClientBarberId(barberId)
            setClientName(name)
            setClientSchedule(schedule)
            setClientServiceId(serviceId)
            setClientTime(time)

            setModalVisible(true)
        }
    }

    // open modal 2
    const handleOpenModal2 = (id: string, status: boolean) => {
        if (!status) {
            setClientId(id)
            setModalVisible2(true)
        }
    }


    return (
        <>
            <main className={styles.bg}>
                <aside className={styles.asideContainer}>
                    <Navbar />
                </aside>
                <section className={styles.sectionContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>
                            <h1>Schedule</h1>
                            <button onClick={() => router.push('/newClient')}>New Client</button>
                        </div>
                        <label>
                            <p>Search Day:</p>
                            <div className={styles.inputContainer}>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.dateInput} />
                                <button onClick={handleClear} className={styles.clear}>Clear</button>
                            </div>
                        </label>
                    </div>
                    <div className={styles.mainContainer}>


                        {searchClients &&
                            <div className={styles.clientsContainer}>
                                {loading ? (<Spinner color='#fba931' className={styles.spinner} />) : (<h2>{newDateFormat}</h2>)}
                                {searchClients?.length === 0 && <p className={styles.noClients}>You dont have any clients on this day...</p>}

                                {searchClients?.map((client) => (
                                    <div key={client.id} className={styles.clientContainer}>
                                        <div onClick={() => handleOpenModal({
                                            id: client.id,
                                            barberId: client.barber.id,
                                            name: client.name,
                                            schedule: client.schedule.slice(0, 10),
                                            serviceId: client.service.id,
                                            time: client.schedule.slice(11, 17),
                                            status: client.status
                                        })} key={client?.id} className={styles.client}>


                                            <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                            <div className={styles.service}>
                                                <p >{client?.service?.name}</p>
                                                <p >${client?.service?.price}</p>
                                            </div>
                                            <p className={styles.clientBarber}>{client.barber.name}</p>
                                            <p className={styles.clientSchedule}>{client.schedule.slice(0, 10)} At<span className={styles.time}>{client.schedule.slice(11, 17)}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        {!searchClients &&
                            <div>
                                <div className={styles.clientsContainer}>
                                    {loading ? (<Spinner color='#fba931' className={styles.spinner} />) : (<h2>Today</h2>)}
                                    {clientsToday?.length === 0 && <p className={styles.noClients}>You dont have any clients today...</p>}

                                    {clientsToday?.map((client) => (
                                        <div key={client.id} className={styles.clientContainer}>
                                            <div onClick={() => handleOpenModal({
                                                id: client.id,
                                                barberId: client.barber.id,
                                                name: client.name,
                                                schedule: client.schedule.slice(0, 10),
                                                serviceId: client.service.id,
                                                time: client.schedule.slice(11, 17),
                                                status: client.status
                                            })} key={client?.id} className={client.status ? `${styles.clientToday} ${styles.clientFinish}` : `${styles.clientToday} ${styles.client}`}>

                                                <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                                <div className={styles.service}>
                                                    <p >{client?.service?.name}</p>
                                                    <p >${client?.service?.price}</p>
                                                </div>
                                                <p className={styles.clientBarber}>{client.barber.name}</p>
                                                <p className={styles.clientSchedule}>Today at <span className={styles.time}>{client.schedule.slice(11, 17)}</span></p>
                                            </div>

                                            <button onClick={(e) => handleOpenModal2(client.id, client.status)} id='checkbox' className={`${client.status ? styles.concludedClient : styles.concludeClient}`}>
                                                <AiOutlineCheck className={styles.icon} size={100} color='#fff' />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={`${styles.clientsContainer} ${styles.clientsTomorrow}`}>
                                    {loading ? ('') : (<h2>Tomorrow</h2>)}
                                    {clientsTomorrow?.length === 0 && <p className={styles.noClients}>You dont have any clients tomorrow...</p>}

                                    {clientsTomorrow?.map((client) => (
                                        <div key={client.id} className={styles.clientContainer}>
                                            <div onClick={() => handleOpenModal({
                                                id: client.id,
                                                barberId: client.barber.name,
                                                name: client.name,
                                                schedule: client.schedule.slice(0, 10),
                                                serviceId: client.service.name,
                                                time: client.schedule.slice(11, 17),
                                                status: client.status
                                            })} key={client?.id} className={styles.client}>

                                                <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                                <div className={styles.service}>
                                                    <p >{client?.service?.name}</p>
                                                    <p >${client?.service?.price}</p>
                                                </div>
                                                <p className={styles.clientBarber}>{client.barber.name}</p>
                                                <p className={styles.clientSchedule}>Tomorrow at <span className={styles.time}>{client.schedule.slice(11, 17)}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                    </div>
                </section>


                {modalVisible &&
                    <ScheduleModal modalVisible={modalVisible} handleModalView={handleModalView} clientData={clientData} />
                }

                {modalVisible2 &&
                    <ConcludeClient client_id={clientId} handleCloseModal2={handleCloseModal2} modalVisible2={modalVisible2} />
                }

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
