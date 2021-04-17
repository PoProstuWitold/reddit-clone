import '../styles/globals.css'
import { AppProps } from 'next/app'
import React, { Fragment } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

const App: React.FC<AppProps> = ({Component, pageProps}) => {

    const { pathname } = useRouter()
    const authRoutes = ['/register', '/login']
    const authRoute = authRoutes.includes(pathname)

    return (
        <Fragment>
            {!authRoute && <NavBar/>}
            <Component {...pageProps} />
        </Fragment>
    )
}

export default App