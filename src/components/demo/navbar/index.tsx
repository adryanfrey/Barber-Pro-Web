import styles from './styles.module.sass'
import Link from 'next/link'

// icons
import { RxScissors } from 'react-icons/rx'
import { AiOutlineSchedule } from 'react-icons/ai'
import { BsFillGearFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Navbar() {

    const [filter, setFilter] = useState(false)

    const openNavMobile = () => {
       const nav = document.querySelector('.' + styles.mobileNavbar)

        if (nav instanceof HTMLDivElement){
            nav.style.transform = 'translate(0)'
            setFilter(true)
        }

    }

    const closeNavbarMobile = () => {
        console.log('asd')
        const nav = document.querySelector('.' + styles.mobileNavbar)

        if (nav instanceof HTMLDivElement){
            nav.style.transform = 'translate(-100%)'
            setFilter(false)
        }

    }

    return (
        <>
            <nav className={styles.navbar}>
                <div onClick={openNavMobile} className={styles.iconContainer}>
                    <RxHamburgerMenu color='#fff' size={40} />
                </div>
                <h1>Barber<span>Pro</span></h1>
                <ul>
                    <li><AiOutlineSchedule size={20} color='#fff' /> <Link className={styles.link} href={'/demo/schedule'}>Schedule</Link></li>
                    <li><BsFillPersonFill size={20} color='#fff' /> <Link className={styles.link} href={'/demo/barbers'}>Barbers</Link></li>
                    <li><RxScissors size={20} color='#fff' /> <Link className={styles.link} href={'/demo/services'}>Services</Link></li>
                    <li><GoGraph size={20} color='#fff' /> <Link className={styles.link} href={'/demo/dashboard'}>Dashboard</Link></li>
                    <li><BsFillGearFill size={20} color='#fff' /> <Link className={styles.link} href={'/demo/me'}>My Account</Link></li>
                </ul>
                
            </nav> 
            <div className={`${styles.mobileNavbar}`}>
                <ul>
                    <li><AiOutlineSchedule size={20} color='#fff' /> <Link className={styles.link} href={'/demo/schedule'}>Schedule</Link></li>
                    <li><BsFillPersonFill size={20} color='#fff' /> <Link className={styles.link} href={'/demo/barbers'}>Barbers</Link></li>
                    <li><RxScissors size={20} color='#fff' /> <Link className={styles.link} href={'/demo/services'}>Services</Link></li>
                    <li><GoGraph size={20} color='#fff' /> <Link className={styles.link} href={'/demo/dashboard'}>Dashboard</Link></li>
                    <li><BsFillGearFill size={20} color='#fff' /> <Link className={styles.link} href={'/demo/me'}>My Account</Link></li>
                </ul>
                <div onClick={closeNavbarMobile} className={styles.iconContainer}> <AiFillCloseCircle color='#fff' size={40}/> </div>
            </div>
            {filter && <div className={styles.filter}></div>}
        </>
    )
}