import React from 'react'
import Head from 'next/head'

interface indexProps {

}

const index: React.FC<indexProps> = ({}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
            <title>reddit: the front page of the internet</title>
        </Head>
        </div>
    )
}

export default index