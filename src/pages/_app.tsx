import '../styles/global.sass'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <ChakraProvider>
      <ToastContainer autoClose={3000}/>
      <Component {...pageProps} />
    </ChakraProvider>
    </AuthProvider>
  )
}
