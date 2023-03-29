import styles from './styles.module.sass'
import Navbar from '@/components/demo/navbar'
import { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import Modal from 'react-modal'
import { IoIosArrowBack } from 'react-icons/io'
import DemoMessage from '@/components/demo/demoMessage'


interface BarberProps {
    id: string
    name: string
    status: boolean
    created_at: string
}

interface HandleOpenModalProps {
    name: string
}

export default function Barbers() {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)

    const [barberName2, setBarberName2] = useState('')
    const [barberName, setBarberName] = useState('')

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

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleOpenModal = ({ name }: HandleOpenModalProps) => {
        setBarberName(name)
        setModalVisible(true)
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0, 0.5)'
        }
    }


    Modal.setAppElement('#__next')

    return (
        <main className={styles.bg}>
            <aside className={styles.asideContainer}>
                <Navbar />
            </aside>

            <section className={styles.sectionContainer}>
                <div className={styles.titleContainer}>
                    <h1>Barbers</h1>
                    <button onClick={() => setModalVisible2(true)}>Register new</button>
                </div>
                <div className={styles.barbersContainer}>
                        <div onClick={() => handleOpenModal({ name: 'John' })} className={styles.barber}>
                            <p className={styles.barberName}><BsFillPersonFill size={30} color='#fba931 ' />John</p>
                            <p>Since: dd/mm/yyyy</p>
                        </div>

                        <div onClick={() => handleOpenModal({ name: 'Mike' })} className={styles.barber}>
                            <p className={styles.barberName}><BsFillPersonFill size={30} color='#fba931 ' />Mike</p>
                            <p>Since: dd/mm/yyyy</p>
                        </div>

                        <div onClick={() => handleOpenModal({ name: 'David' })} className={styles.barber}>
                            <p className={styles.barberName}><BsFillPersonFill size={30} color='#fba931 ' />David</p>
                            <p>Since: dd/mm/yyyy</p>
                        </div>
                </div>
            </section>
            
            {modalVisible &&
                <Modal className={styles.modal} style={customStyles} isOpen={modalVisible} onRequestClose={handleCloseModal}>
                    <div className={styles.titleContainer}>
                        <button onClick={() => setModalVisible(false)}><IoIosArrowBack size={20} className={styles.icon} />Back</button>
                        <h1>Edit Barber</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} >
                            <label>
                                Barber Name:
                                <input type="text" required value={barberName} onChange={(e) => setBarberName(e.target.value)} />
                            </label>

                            <button type='button' onClick={handleDemoMessage} className={styles.saveBtn}>
                                Save
                            </button>

                            <button type='button' onClick={handleDemoMessage} className={styles.deleteBtn}>
                                Disable Barber
                            </button>
                        </form>
                    </div>
                </Modal>
            }

            {modalVisible2 &&
                <Modal className={styles.modal} style={customStyles} isOpen={modalVisible2} onRequestClose={handleCloseModal}>
                    <div className={styles.titleContainer}>
                        <button onClick={() => setModalVisible2(false)}><IoIosArrowBack size={20} className={styles.icon} />Back</button>
                        <h1>New Barber</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} >
                            <label>
                                Barber's Name:
                                <input type="text" required value={barberName2} onChange={(e) => setBarberName2(e.target.value)} />
                            </label>

                            <button onClick={handleDemoMessage} type='button' className={styles.saveBtn}>
                                Register
                            </button>
                        </form>
                    </div>
                </Modal>
            }

            {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
            {filter && <div className={styles.filter}></div>}
        </main>
    )
}