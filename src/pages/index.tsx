import Head from 'next/head'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import { FormEvent, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import styles from '@/styles/login.module.sass'
import { Spinner } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

export default function Home() {
  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await signIn({ email, password })

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Barber Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <Image priority src={logo} alt='logo' fill />
          </div>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder='Your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loading}>
              {loading ? (<Spinner />) : ('Login')}
            </button>
          </form>
          <Link className={styles.register} href='/register'>
            Dont have an account? Register
          </Link>
          <Link className={styles.register} href='/demo/schedule'>
            Try demo account !
          </Link>
        </div>
      </main>
    </>
  )
}

// check user Authentication 
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)

  if (cookies['@barberProToken']) {
    return {
      redirect: {
        destination: '/schedule',
        permanent: false
      }
    }
  } 

  return {
    props: {

    }
  }
} 
