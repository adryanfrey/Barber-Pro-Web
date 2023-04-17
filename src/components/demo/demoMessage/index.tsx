import styles from './styles.module.sass' 
import Router from 'next/router'


interface DemoProps{
    setDemoMessage: () => void
}

export default function DemoMessage({setDemoMessage}: DemoProps){

    return(
        <>
            <div className={styles.container}>
                <h1>Create an account for free to start using BarberPro !</h1>
                <div>
                    <button onClick={setDemoMessage} className={styles.cancelBtn}>Cancel</button>
                    <button onClick={() => Router.push('/register')} className={styles.registerBtn}>Register</button>
                </div>
            </div>
        </>
    )
}