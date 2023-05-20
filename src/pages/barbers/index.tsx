import styles from './styles.module.sass'
import Navbar from '@/components/navbar/Navbar'
import { FormEvent, useEffect, useState } from 'react'
import { setUpApiClient } from '@/services/api'
import { BsFillPersonFill } from 'react-icons/bs'
import Modal from 'react-modal'
import { IoIosArrowBack } from 'react-icons/io'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { GetServerSidePropsContext } from 'next'
import {  parseCookies } from "nookies"


interface BarberProps {
    id: string
    name: string
    status: boolean
    created_at: string
}

interface HandleOpenModalProps {
    name: string
    id: string
}

export default function Barbers() {
    const [barbersList, setBarbersList] = useState<BarberProps[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [modalVisible2, setModalVisible2] = useState(false)
    const [barberName2, setBarberName2] = useState('')

    const [barberName, setBarberName] = useState('')
    const [barberId, setBarberId] = useState('')

    // handle first load, get data
    useEffect(() => {

        async function getBarbers() {
            const api = setUpApiClient({})

            const response = await api.get('/barber')

            // handle date format
            const data = response.data
            const dataFixed: BarberProps[] = data.map((barber: BarberProps) => {
                const time1 = barber.created_at.split('T')
                const time2 = time1[0].split('-')

                return { ...barber, created_at: `${time2[2]}-${time2[1]}-${time2[0]}` }
            })

            setBarbersList(dataFixed.filter(barber => barber.status === true))
            setLoading(false)
        }

        getBarbers()
    }, [])


    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0, 0.5)'
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const api = setUpApiClient({})

        try {
            await api.put('/barber', {
                name: barberName,
                barber_id: barberId
            })
            toast.success('Barber Saved')

            setBarbersList(barbersList?.map((barber) => {
                if (barber.id === barberId){
                    return {...barber, name: barberName}
                } else {
                    return {...barber}
                }
            }))

        } catch (error) {
            toast.error('Sorry there was an error try again later')
        }

        setLoading(false)
        setModalVisible(false)
    }


    // register new barber

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        const api = setUpApiClient({})

        setLoading(true)

        try {
            const response = await api.post('/barber', {
                name: barberName2
            })
            toast.success('Success! New barber on the area')
            const data = new Date()
            setBarbersList([...barbersList, { name: response.data.name, id: response.data.id, created_at: 'Today!', status: response.data.status }])
        } catch (error) {
            toast.warn('Sorry there was an error try again later')
        }

        setLoading(false)
        setModalVisible2(false)
    }

    // disable a barber 

    const handleDisable = async () => {
        const api = setUpApiClient({})
        setDeleteLoading(true)

        try {
            await api.put('/barber', {
                barber_id: barberId,
                status: false
            })

            toast.success('Barber disabled')
            setBarbersList(barbersList?.filter(barber => barber.id !== barberId))

        } catch (error) {
            toast.warn('Sorry there was an error try again later')
        }

        setDeleteLoading(false)
        setModalVisible(false)
    }

    const handleOpenModal = ({ name, id }: HandleOpenModalProps) => {
        setBarberName(name)
        setBarberId(id)
        setModalVisible(true)
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
                    {loading && <Spinner className={styles.spinner} color='#fba931'/>}
                    {barbersList.length === 0 && <p className={styles.noBarbers}>You haven't employed any barbers yet...</p>}
                    {barbersList?.map((barber) => (
                        <div onClick={() => handleOpenModal({ name: barber.name, id: barber.id })} key={barber.id} className={styles.barber}>
                            <p className={styles.barberName}><BsFillPersonFill size={30} color='#fba931 ' />{barber?.name}</p>
                            <p>Since: {barber.created_at}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {modalVisible &&
                <Modal className={styles.modal} style={customStyles} isOpen={modalVisible} onRequestClose={handleCloseModal}>
                    <div className={styles.titleContainer}>
                        <button onClick={() => setModalVisible(false)}><IoIosArrowBack size={20} className={styles.icon} />Back</button>
                        <h1>Edit Barber</h1>
                    </div>
                    <div className={styles.meContainer}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <label>
                                Barber Name:
                                <input type="text" required value={barberName} onChange={(e) => setBarberName(e.target.value)} />
                            </label>

                            <button disabled={loading} className={styles.saveBtn}>
                                {loading ? (<Spinner />) : ('Save')}
                            </button>

                            <button type='button' disabled={deleteLoading} onClick={handleDisable} className={styles.deleteBtn}>
                                {deleteLoading ? (<Spinner />) : ('Disable Barber')}
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
                        <form className={styles.formContainer} onSubmit={handleRegister}>
                            <label>
                                Barber's Name:
                                <input type="text" required value={barberName2} onChange={(e) => setBarberName2(e.target.value)} />
                            </label>

                            <button disabled={loading} className={styles.saveBtn}>
                                {loading ? (<Spinner />) : ('Register')}
                            </button>
                        </form>
                    </div>
                </Modal>
            }

        </main>
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
