import '../styles/globals.css'
import { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

const App: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <Component {...pageProps} />
    )
}

export default App