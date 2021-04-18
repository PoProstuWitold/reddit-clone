import '../styles/globals.css'
import '../styles/icons.css'
import { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context/auth'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

const App: React.FC<AppProps> = ({Component, pageProps}) => {

    const { pathname } = useRouter()
    const authRoutes = ['/register', '/login']
    const authRoute = authRoutes.includes(pathname)

    return (
        <AuthProvider>
            {!authRoute && <NavBar/>}
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default App