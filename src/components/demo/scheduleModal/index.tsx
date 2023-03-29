import styles from './styles.module.sass'
import Modal from 'react-modal'
import { useState, FormEvent } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import DemoMessage from '../demoMessage'


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
    day: string
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
    const [demoMessage, setDemoMessage] = useState(false)
    const [filter, setFilter] = useState(false)


    const servicesList = [
        {
            name: 'Haircut',
            status: true,
            id: 'haircut1',
            price: 20
        },
        {
            name: 'Beard',
            status: true,
            id: 'beard1',
            price: 15
        },
        {
            name: 'Haircut & Beard',
            status: true,
            id: 'haircutBeard1',
            price: 30
        }
    ]

    const barbersList = [
        {
            id: 'john1',
            name: 'John',
        },
        {
            id: 'david1',
            name: 'David'
        },
        {
            id: 'mike1',
            name: 'Mike'
        }
    ]

    // edit client information

    const handleDemoMessage = async (e: FormEvent) => {
        e.preventDefault()
        setDemoMessage(true)
        setFilter(true)
    }

    const closeDemoMessage = () => {
        setDemoMessage(false)
        setFilter(false)
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0, 0.5)',
            zIndex: 2
        }
    }

    Modal.setAppElement('#__next')
    return (
        <>
            <Modal className={styles.modal} style={customStyles} isOpen={modalVisible} onRequestClose={handleModalView}>
                <section className={styles.container}>
                    <div className={styles.titleContainer}>
                        <button onClick={handleModalView}>< IoIosArrowBack size={20} className={styles.icon} /> <p>Back</p></button>
                        <h1>Client Details</h1>
                    </div>
                    <div className={styles.clientContainer}>
                        <form className={styles.formContainer} onSubmit={handleDemoMessage}>
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

                            <button className={styles.saveBtn}>
                                Save Edit
                            </button>

                            <button onClick={handleDemoMessage} className={styles.deleteBtn}>
                                Delete client
                            </button >
                        </form>
                    </div>
                </section>
            </Modal>
            {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
            {filter && <div className={styles.filter}></div>}
        </>
    )
}