import styles from './styles.module.sass'
import Navbar from "@/components/demo/navbar"
import { useState } from "react"
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import DemoMessage from '@/components/demo/demoMessage'


export default function NewClient() {
    const [clientName, setClientName] = useState('')
    const [selectedBarber, setSelectedBarber] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [schedule, setSchedule] = useState('')
    const [time, setTime] = useState('Now')
    const router = useRouter()

    const [demoMessage, setDemoMessage] = useState(false)
    const [filter, setFilter] = useState(false)

    const handleSubmit = () => {

        setDemoMessage(true)
        setFilter(true)
    }

    const closeDemoMessage = () => {
        setDemoMessage(false)
        setFilter(false)
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
                                    <option value={1}>Mike</option>
                                    <option value={2}>John</option>
                                    <option value={3}>David</option>
                                </select>
                            </label>

                            <label>
                                Service:
                                <select required value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>\
                                        <option value={1}>Haircut</option>
                                        <option value={1}>Beard</option>
                                        <option value={1}>Haircut & Beard</option>
                                </select>
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
                            <button type='button' onClick={handleSubmit} className={styles.saveBtn}>
                                Register
                            </button>
                        </form>
                    </div>
                </section>
                {filter && <div className={styles.filter}></div>}
                {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
            </main>
        </>
    )
}

