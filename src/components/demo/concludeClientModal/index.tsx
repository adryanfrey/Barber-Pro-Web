import styles from './styles.module.sass'
import Modal from 'react-modal'
import { Spinner } from '@chakra-ui/react'
import { useState, useEffect, FormEvent } from 'react'
import DemoMessage from '../demoMessage'




interface ModalProps {
    modalVisible2: boolean
    handleCloseModal2: () => void
    client_id: string
}


export default function ConcludeClient({ modalVisible2, handleCloseModal2: handleCloseModal2, client_id }: ModalProps) {

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

    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0, 0.5)',
            zIndex: 2
        }
    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Modal className={styles.modal} style={customStyles} isOpen={modalVisible2} onRequestClose={handleCloseModal2}>
                <h1>Conclude Client ?</h1>
                <p>This action cannot be undone and you will not be able to edit the details of the client afterwards</p>

                <div>
                    <button onClick={handleDemoMessage} className={styles.concludeBtn}>Conclude</button>
                    <button onClick={handleCloseModal2} className={styles.cancelBtn}>Cancel</button>
                </div>
            </Modal>
            {demoMessage && <DemoMessage setDemoMessage={closeDemoMessage}/>}
            {filter && <div className={styles.filter}></div>}
        </>
    )
}