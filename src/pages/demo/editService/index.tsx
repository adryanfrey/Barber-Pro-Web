import styles from './styles.module.sass'
import Navbar from "@/components/navbar/Navbar"
import { useState } from "react"
import { FormEvent } from "react"
import { useRouter } from 'next/router'
import { Switch } from '@chakra-ui/react'
import { IoIosArrowBack } from 'react-icons/io'
import DemoMessage from '@/components/demo/demoMessage'


export default function NewService() {
    const router = useRouter()
    const {serviceName, servicePrice, serviceId, status} = router.query
    const boolean = (status === 'true')

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [name, setName] = useState(serviceName)
    const [price, setPrice] = useState(servicePrice)
    const [serviceStatus, setServiceStatus] = useState<boolean>(!boolean)

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

    const handleDisable = () => {
        if (serviceStatus){
            setServiceStatus(false)
        } else {
            setServiceStatus(true)
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
                        <button onClick={() => router.back()}><IoIosArrowBack size={20} className={styles.icon}/>Back</button>
                        <h1>Edit Service</h1>
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

                            <label className={styles.disableContainer}>
                                Disable service 
                                <Switch className={styles.switch} size={'lg'} colorScheme={'red'} isChecked={serviceStatus} onChange={handleDisable}/>
                            </label>
                           
                            <button onClick={handleDemoMessage} type='button' className={styles.saveBtn}>
                                Save
                            </button>

                            <button type='button'  onClick={handleDemoMessage} className={styles.deleteBtn}>
                                Delete
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