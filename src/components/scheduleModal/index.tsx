import styles from './styles.module.sass'
import Modal from 'react-modal'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { useState, useEffect, FormEvent } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { setUpApiClient } from '@/services/api'


interface ModalProps {
    modalVisible: boolean
    handleModalView: () => void
    clientData: ClientDataProps
}

export interface ClientDataProps {
    id: string
    name: string
    schedule: string
    serviceId: string
    barberId: string
    time: string
    status: boolean
}

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

export default function ScheduleModal({ modalVisible, handleModalView, clientData }: ModalProps) {

    // convert date format to yyyy-mm-dd
    const dateString = clientData.schedule
    const parts = dateString.split('/')
    const reversed = parts.reverse()
    const formattedDate = reversed.join('-')

    // states
    const [clientName, setClientName] = useState(clientData.name)
    const [selectedBarber, setSelectedBarber] = useState(clientData.barberId)
    const [selectedService, setSelectedService] = useState(clientData.serviceId)
    const [schedule, setSchedule] = useState(formattedDate)
    const [time, setTime] = useState(clientData.time)

    const [servicesList, setServicesList] = useState<ServiceProps[]>()
    const [barbersList, setBarbersList] = useState<BarberProps[]>()

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)


    // get data on first load
    useEffect(() => {
        async function getData() {
            const api = setUpApiClient({})
            const response = await api.get('/services')
            const response2 = await api.get('/barber')

            const barbers: BarberProps[] = response2.data
            const services: ServiceProps[] = response.data

            setSelectedService(clientData.serviceId)
            setSelectedBarber(clientData.barberId)
            setServicesList(services.filter(service => service.status === true))
            setBarbersList(barbers.filter(barber => barber.status === true))
        }

        getData()
    }, [])


    // edit client information

    const handleEditClient = async (e: FormEvent) => {
        e.preventDefault()

        const api = setUpApiClient({})
        setLoading(true)

        // handle Date format 
        const date = new Date()

        if (time !== 'Now') {
            let splitTime = time.split(':')
            date.setHours(Number(splitTime[0]), Number(splitTime[1]))
        }

        if (schedule.includes('-')) {
            let splitSchedule = schedule.split('-')
            date.setFullYear(Number(splitSchedule[0]), Number(splitSchedule[1]) - 1, Number(splitSchedule[2]))
        } else {
            let splitSchedule = schedule.split('/')
            date.setFullYear(Number(splitSchedule[0]), Number(splitSchedule[1]) - 1, Number(splitSchedule[2]))
        }

        const dateString = date.toLocaleString()

        try {
            await api.put('/client/edit', {
                service_id: selectedService,
                barberId: selectedBarber,
                name: clientName,
                schedule: dateString,
                client_id: clientData.id
            })
            toast.success('Client edit successfully')
            handleModalView()
        } catch (error) {
            toast.warn('Sorry there was an error try again later')
        }
        setLoading(false)
    }


    // delete client
    const handleDelete = async () => {
        const api = setUpApiClient({})
        setDeleteLoading(true)

        try {
            await api.delete('/client', {
                params: {
                    client_id: clientData.id
                }
            })
            handleModalView()
            toast.success('Client removed from schedule')

        } catch (error) {
            toast.warn('Sorry there was an error')
        }
        setDeleteLoading(false)
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0, 0.5)',
            zIndex: 2
        }
    }

    Modal.setAppElement('#__next')
    return (
        <Modal className={styles.modal} style={customStyles} isOpen={modalVisible} onRequestClose={handleModalView}>
            <section className={styles.container}>
                <div className={styles.titleContainer}>
                    <button onClick={handleModalView}>< IoIosArrowBack size={20} className={styles.icon} /> <p>Back</p></button>
                    <h1>Client Details</h1>
                </div>
                <div className={styles.clientContainer}>
                    <form className={styles.formContainer} onSubmit={handleEditClient}>
                        <label>
                            Client's Name:
                            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} />
                        </label>

                        <label>
                            Barber's name:
                            <select value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value)}>
                                {barbersList?.map((barber) => (
                                    <option value={barber.id} key={barber.id}>{barber.name}</option>
                                ))}
                            </select>
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
                        </label>

                        <label className={styles.dateInput}>
                            Time:
                            <select value={time} onChange={(e) => setTime(e.target.value)}>
                                <option>{time}</option>
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
                            {loading ? (<Spinner />) : ('Save Edit')}
                        </button>

                        <button onClick={handleDelete} disabled={deleteLoading} className={styles.deleteBtn}>
                            {deleteLoading ? (<Spinner />) : ('Delete client')}
                        </button >
                    </form>
                </div>
            </section>
        </Modal>
    )
}