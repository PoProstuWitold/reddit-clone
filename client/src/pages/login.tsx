import React, { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputField from '../components/InputField'

interface loginProps {

}

const Login: React.FC<loginProps> = ({}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState<any>({})


    const router = useRouter()


    const submitForm = async (event: FormEvent) => {
        event.preventDefault()
    
        try {
            await axios.post('/auth/login', {
                email,
                password
            })
    
          router.push('/')
        } catch (err) {
            if(err.message.includes(400) || err.message.includes(401)) {
                err.message.includes(400) ? setErrors(err.response.data) : setErrors({message: 'Field is required'})
            }
        }
      }

    return (
        <div className="flex">
            <Head>
                <title>Login</title>
            </Head>

            <div 
                className="h-screen bg-center bg-cover w-36" 
                style={{ backgroundImage: "url('/images/taiga.jpg')" }}
            >

            </div>
            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                    <h1 className="mb-2 text-lg font-semibold">Sign In</h1>
                    {/* FORM */}
                    <form onSubmit={submitForm}>
                        <div className="mb-6">
                        </div>
                        <InputField
                            className="mb-2"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            placeholder="EMAIL"
                            error={errors.message}
                        />
                        <InputField
                            className="mb-4"
                            type="password"
                            value={password}
                            setValue={setPassword}
                            placeholder="PASSWORD"
                            error={errors.message}
                        />
                        <button className="w-full py-2 mb-4 text-xs text-white uppercase transition duration-500 bg-blue-500 border border-blue-500 rounded-lg font-b2ld">
                            Submit
                        </button>
                    </form>

                    <small>
                        New to reddit?
                        <Link href="/register">
                             <a className="ml-1 text-blue-500 uppercase">SIGN UP</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login