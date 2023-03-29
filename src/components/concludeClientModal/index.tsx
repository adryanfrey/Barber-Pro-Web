import styles from './styles.module.sass'
import Modal from 'react-modal'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { useState, useEffect, FormEvent } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { setUpApiClient } from '@/services/api'



interface ModalProps {
    modalVisible2: boolean
    handleCloseModal2: () => void
    client_id: string
}


export default function ConcludeClient({ modalVisible2, handleCloseModal2: handleCloseModal2, client_id }: ModalProps) {

    const [loading, setLoading] = useState(false)

    const handleConcludeClient = async () => {
        const api = setUpApiClient({})
        setLoading(true)

        try {

            const response = await api.put('/client', {
                client_id
            })
            toast.success('Client Concluded')
            handleCloseModal2()
            console.log(response.data)

        } catch (error) {
            toast.warn('Sorry there was an error')
        }

        setLoading(false)
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0, 0.5)',
            zIndex: 2
        }
    }

    Modal.setAppElement('#__next')

    return (
        <Modal className={styles.modal} style={customStyles} isOpen={modalVisible2} onRequestClose={handleCloseModal2}>
            <h1>Conclude Client ?</h1>
            <p>This action cannot be undone and you will not be able to edit the details of the client afterwards</p>
            {loading ? (
                <Spinner className={styles.icon} color='#fff' />
            ) :
                <div>
                    <button onClick={handleConcludeClient} className={styles.concludeBtn}>Conclude</button>
                    <button onClick={handleCloseModal2} className={styles.cancelBtn}>Cancel</button>
                </div>
            }

        </Modal>
    )
}