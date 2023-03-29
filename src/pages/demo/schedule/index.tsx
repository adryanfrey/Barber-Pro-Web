import styles from './styles.module.sass'
import Navbar from "@/components/demo/navbar"
import { BsFillPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import {  useEffect, useState } from 'react'
import ScheduleModal from '@/components/demo/scheduleModal'
import { ClientDataProps } from '@/components/scheduleModal'
import { AiOutlineCheck } from 'react-icons/ai'
import ConcludeClient from '@/components/demo/concludeClientModal'

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
    status: boolean
    service: ServiceProps
    barber: BarberProps
    time: string
}

export default function Schedule() {

    // get the date of today
    const today = new Date()
    const todayDate = today.toLocaleString().slice(0, 10)

    // date of tomorrow
    today.setDate(today.getDate() + 1)
    const tomorrow = today.toLocaleString().slice(0, 10)

    // barbers
    const john = {
        id: 'john1',
        name: 'John',
    }

    const david = {
        id: 'david1',
        name: 'David'
    }

    const mike = {
        id: 'mike1',
        name: 'Mike'
    }

    // services 
    const haircut = {
        name: 'Haircut',
        status: true,
        id: 'haircut1',
        price: 20
    }

    const beard = {
        name: 'Beard',
        status: true,
        id: 'beard1',
        price: 15
    }

    const haircutBeard = {
        name: 'Haircut & Beard',
        status: true,
        id: 'haircutBeard1',
        price: 30
    }

    const [clientsToday, setClientsToday] = useState<ClientsProps[]>([
        {
            barber: john,
            id: '1',
            name: 'Liam',
            schedule: todayDate,
            time: '09:00',
            service: haircut,
            status: true
        },
        {
            barber: david,
            id: '2',
            name: 'Noah',
            schedule: todayDate,
            time: '09:00',
            service: haircutBeard,
            status: true
        },
        {
            barber: mike,
            id: '3',
            name: 'Oliver',
            schedule: todayDate,
            time: '09:00',
            service: beard,
            status: true
        },
        {
            barber: mike,
            id: '4',
            name: 'Elijah',
            schedule: todayDate,
            time: '10:00',
            service: haircutBeard,
            status: false
        },
        {
            barber: john,
            id: '5',
            name: 'James',
            schedule: todayDate,
            time: '11:00',
            service: haircut,
            status: false
        },
        {
            barber: david,
            id: '6',
            name: 'William',
            schedule: todayDate,
            time: '12:00',
            service: beard,
            status: false
        },
        {
            barber: david,
            id: '7',
            name: 'Benjamin',
            schedule: todayDate,
            time: '14:00',
            service: beard,
            status: false
        },
        {
            barber: mike,
            id: '8',
            name: 'Henry',
            schedule: todayDate,
            time: '15:00',
            service: haircutBeard,
            status: false
        },
    ])
    const [clientsTomorrow, setClientsTomorrow] = useState<ClientsProps[]>([
        {
            barber: john,
            id: '1',
            name: 'Benjamin',
            schedule: tomorrow,
            time: '09:00',
            service: haircut,
            status: false
        },
        {
            barber: david,
            id: '2',
            name: 'Lucas',
            schedule: tomorrow,
            time: '09:00',
            service: haircutBeard,
            status: false
        },
        {
            barber: mike,
            id: '3',
            name: 'Theodore',
            schedule: tomorrow,
            time: '09:00',
            service: beard,
            status: false
        },
        {
            barber: mike,
            id: '4',
            name: 'Eliam',
            schedule: tomorrow,
            time: '10:00',
            service: haircutBeard,
            status: false
        },
        {
            barber: john,
            id: '5',
            name: 'Evander',
            schedule: tomorrow,
            time: '11:00',
            service: haircut,
            status: false
        },
        {
            barber: david,
            id: '6',
            name: 'Camilo',
            schedule: tomorrow,
            time: '12:00',
            service: beard,
            status: false
        },
        {
            barber: david,
            id: '7',
            name: 'Ozzy',
            schedule: tomorrow,
            time: '14:00',
            service: beard,
            status: false
        },
        {
            barber: mike,
            id: '8',
            name: 'Khai',
            schedule: tomorrow,
            time: '15:00',
            service: haircutBeard,
            status: false
        },
    ])
    const [searchClients, setSearchClients] = useState<ClientsProps[]>()

    console.log(clientsTomorrow)
    console.log(clientsToday)


    // other states
    const [date, setDate] = useState('')
    const [newDateFormat, setNewDateFormat] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)

    // router
    const router = useRouter()


    // search for clients in a specific date
    useEffect(() => {

        if (date) {
            // handle date format
            const dateSplit = date.split('-')
            const reverse = dateSplit.reverse()
            const newDateFormat = reverse.join('/')
            setNewDateFormat(newDateFormat)

            if (newDateFormat === todayDate){
                setSearchClients(clientsToday?.filter((client) => {
                    return client.schedule.slice(0, 10).includes(newDateFormat)
                }))

                return
            } 

            if (newDateFormat === tomorrow){
                setSearchClients(clientsTomorrow.filter((client) => {
                    return client.schedule.slice(0, 10).includes(newDateFormat)
                }))

                return
            } 

            setSearchClients([])

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
    const [day, setDay] = useState('')

    const clientData = {
        id: clientId,
        name: clientName,
        schedule: clientSchedule,
        serviceId: clientServiceId,
        barberId: clientBarberId,
        time: clientTime,
        status: true,
        day: day
    }

    const handleOpenModal = ({ id, name, schedule, serviceId, barberId, time, status }: ClientDataProps) => {
        if (!status) {
            setClientId(id)
            setClientBarberId(barberId)
            setClientName(name)
            setClientSchedule(schedule)
            setClientServiceId(serviceId)
            setClientTime(time)
            setDay(day)
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
                            <button onClick={() => router.push('/demo/newClient')}>New Client</button>
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
                                <h2>{newDateFormat}</h2>
                                {searchClients?.length === 0 && <p className={styles.noClients}>You dont have any clients on this day...</p>}
                                {searchClients.length > 0 &&
                                    < div className={styles.tableTitle}>
                                        <p className={styles.cn}>Client:</p>
                                        <p className={styles.sn}>Service:</p>
                                        <p className={styles.bn}>Barber:</p>
                                        <p className={styles.scheduleTitle}>Schedule:</p>
                                    </div>
                                }

                                {searchClients?.map((client) => (
                                    <div key={client.id} className={styles.clientContainer}>
                                        <div onClick={() => handleOpenModal({
                                            id: client.id,
                                            barberId: client.barber.id,
                                            name: client.name,
                                            schedule: client.schedule.slice(0, 10),
                                            serviceId: client.service.id,
                                            time: client.time,
                                            status: client.status,
                                        })} key={client?.id} className={styles.client}>


                                            <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                            <div className={styles.service}>
                                                <p >{client?.service?.name}</p>
                                                <p >${client?.service?.price}</p>
                                            </div>
                                            <p className={styles.clientBarber}>{client.barber.name}</p>
                                            <p className={styles.clientSchedule}>{client.schedule.slice(0, 10)} At <span className={styles.time}>{client.time}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        {!searchClients &&
                            <div>
                                <div className={styles.clientsContainer}>
                                    <h2>Today</h2>
                                    {clientsToday?.length === 0 && <p className={styles.noClients}>You dont have any clients today...</p>}

                                    {clientsToday?.length > 0 &&
                                        <div className={styles.tableTitle}>
                                            <p className={styles.cn}>Client:</p>
                                            <p className={styles.sn}>Service:</p>
                                            <p className={styles.bn}>Barber:</p>
                                            <p className={styles.scheduleTitle}>Schedule:</p>
                                        </div>
                                    }

                                    {clientsToday?.map((client) => (
                                        <div key={client.id} className={styles.clientContainer}>
                                            <div onClick={() => handleOpenModal({
                                                id: client.id,
                                                barberId: client.barber.id,
                                                name: client.name,
                                                schedule: client.schedule.slice(0, 10),
                                                serviceId: client.service.id,
                                                time: client.time,
                                                status: client.status,
                                            })} key={client?.id} className={client.status ? `${styles.clientToday} ${styles.clientFinish}` : `${styles.clientToday} ${styles.client}`}>

                                                <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                                <div className={styles.service}>
                                                    <p >{client?.service?.name}</p>
                                                    <p >${client?.service?.price}</p>
                                                </div>
                                                <p className={styles.clientBarber}>{client.barber.name}</p>
                                                <p className={styles.clientSchedule}>Today at <span className={styles.time}>{client.time}</span></p>
                                            </div>

                                            <button onClick={(e) => handleOpenModal2(client.id, client.status)} id='checkbox' className={`${client.status ? styles.concludedClient : styles.concludeClient}`}>
                                                <AiOutlineCheck className={styles.icon} size={100} color='#fff' />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={`${styles.clientsContainer} ${styles.clientsTomorrow}`}>
                                    <h2>Tomorrow</h2>
                                    {clientsTomorrow?.length === 0 && <p className={styles.noClients}>You dont have any clients tomorrow...</p>}
                                    {clientsTomorrow.length > 0 &&
                                        <div className={styles.tableTitle}>
                                            <p className={styles.cn}>Client:</p>
                                            <p className={styles.sn}>Service:</p>
                                            <p className={styles.bn}>Barber:</p>
                                            <p className={styles.scheduleTitle}>Schedule:</p>
                                        </div>
                                    }

                                    {clientsTomorrow?.map((client) => (
                                        <div key={client.id} className={styles.clientContainer}>
                                            <div onClick={() => handleOpenModal({
                                                id: client.id,
                                                barberId: client.barber.name,
                                                name: client.name,
                                                schedule: client.schedule.slice(0, 10),
                                                serviceId: client.service.name,
                                                time: client.time,
                                                status: client.status,
                                            })} key={client?.id} className={styles.client}>

                                                <p className={styles.clientName}><BsFillPersonFill size={30} color='#fff' />{client?.name}</p>
                                                <div className={styles.service}>
                                                    <p >{client?.service?.name}</p>
                                                    <p >${client?.service?.price}</p>
                                                </div>
                                                <p className={styles.clientBarber}>{client.barber.name}</p>
                                                <p className={styles.clientSchedule}>Tomorrow at <span className={styles.time}>{client.time}</span></p>
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

