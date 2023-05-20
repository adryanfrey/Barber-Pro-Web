import Head from 'next/head'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import { FormEvent, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import styles from './styles.module.sass'
import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { setUpApiClient } from '@/services/api'
import { toast } from 'react-toastify'
import { GetServerSidePropsContext } from 'next'

export default function Register() {
  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassoword] = useState('')

  const [loading, setLoading] = useState(false)
  const { signIn } = useContext(AuthContext)
  const router = useRouter()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const api = setUpApiClient({})

    if (password !== confirmPassword) {
      toast.warn('Passwords must be the same')
      setLoading(false)
      return
    }

    try {
      await api.post('/user', {
        email,
        password,
        name
      })
      toast.success('Account created successfully')
      router.push('/')
    } catch (error) {
      toast.warn('Sorry there was an error try again later')
    }

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
          <form onSubmit={handleRegister}>

            <label>
              Your company's name:
              <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Your email:
              <input type="text" placeholder='Your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              Create a new password:
              <input type="password" placeholder='Your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <label>
              Confirm password:
              <input type="password" placeholder='Confirm password' required value={confirmPassword} onChange={(e) => setConfirmPassoword(e.target.value)} />
            </label>

            <button disabled={loading}>
              {loading ? (<Spinner />) : ('Register')}
            </button>
          </form>
          <Link className={styles.register} href='/'>
            Already have an account? Sign in
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

