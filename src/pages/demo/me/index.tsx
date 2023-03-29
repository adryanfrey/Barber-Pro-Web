import styles from './styles.module.sass'
import Navbar from "@/components/demo/navbar"
import { useState, useEffect } from "react"
import { destroyCookie, parseCookies } from "nookies"
import { useRouter } from 'next/router'
import DemoMessage from '@/components/demo/demoMessage'


export default function Me() {
    const [name, setName] = useState('BarberPro Demo')
    const [address, setAddress] = useState('...')
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

    const handleLogOut = () => {
        destroyCookie({}, '@barberProToken')
        router.push('/')
    }

    return (
        <>
            <main className={styles.bg}>
                <aside className={styles.asideContainer}>
                    <Navbar />
                </aside>
                <section className={styles.sectionContainer}>
                    <div className={styles.titleContainer}>
                        <h1>My Account</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer}>
                            <label>
                                Barber Shop name:
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Address:
                                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                            </label>
                            <button type='button' onClick={handleDemoMessage} className={styles.saveBtn}>Save</button>
                            <button onClick={handleLogOut} type='button' className={styles.logOutBtn}>Log out</button>
                        </form>
                    </div>
                </section>
                {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
                {filter && <div className={styles.filter}></div>}
            </main>
        </>
    )
}

