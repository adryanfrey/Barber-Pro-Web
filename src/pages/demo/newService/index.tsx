import styles from './styles.module.sass'
import Navbar from "@/components/demo/navbar"
import { useState } from "react"
import { FormEvent } from "react"
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import DemoMessage from '@/components/demo/demoMessage'


export default function NewService() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [demoMessage, setDemoMessage] = useState(false)
    const [filter, setFilter] = useState(false)

    const handleDemoMessage = () => {
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
                        <h1>New Service</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer}>
                            <label>
                                Service Name:
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Price:
                                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
                            </label>

                            <button type='button' onClick={handleDemoMessage} className={styles.saveBtn}>
                                Register
                            </button>
                        </form>
                    </div>
                </section>

                {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
                {filter && <div className={styles.filter}></div>}
            </main>
        </>
    )
}
