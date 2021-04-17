import React, { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputField from '../components/InputField'
import { mapErrors } from '../utils'

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {

    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [agreement, setAgreement] = useState(false)

    const [errors, setErrors] = useState<any>({})


    const router = useRouter()


    const submitForm = async (event: FormEvent) => {
        event.preventDefault()
    
        if (!agreement) {
            setErrors({ ...errors, agreement: 'You must agree to T&Cs' })
            return
        }
    
        try {
            await axios.post('/auth/register', {
                email,
                nick,
                firstName,
                lastName,
                password
            })
    
          router.push('/')
        } catch (err) {
            setErrors(mapErrors(err.response.data))
        }
      }

    return (
        <div className="flex">
            <Head>
                <title>Register</title>
            </Head>

            <div 
                className="h-screen bg-center bg-cover w-36" 
                style={{ backgroundImage: "url('/images/taiga.jpg')" }}
            >

            </div>
            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                    <h1 className="mb-2 text-lg font-semibold">Sign Up</h1>
                    <p className="mb-10 text-xs">
                        By continuing, you agree to our User Agreement and Privacy Policy
                    </p>
                    {/* FORM */}
                    <form onSubmit={submitForm}>
                        <div className="mb-6">
                        <input
                            type="checkbox"
                            className="mr-1 cursor-pointer"
                            id="agreement"
                            checked={agreement}
                            onChange={(e) => setAgreement(e.target.checked)}
                        />
                            <label htmlFor="agreement" className="text-xs cursor-pointer">
                                I agree to get emails about cool stuff on Reddit
                            </label>
                            <small className="block font-medium text-red-600">
                                {errors.agreement}
                            </small>
                        </div>
                        <InputField
                            className="mb-2"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            placeholder="EMAIL"
                            error={errors.email}
                        />
                        <InputField
                            className="mb-2"
                            type="text"
                            value={nick}
                            setValue={setNick}
                            placeholder="NICK NAME"
                            error={errors.nick}
                        />
                        <InputField
                            className="mb-2"
                            type="text"
                            value={firstName}
                            setValue={setFirstName}
                            placeholder="FIRST NAME"
                            error={errors.firstName}
                        />
                        <InputField
                            className="mb-2"
                            type="text"
                            value={lastName}
                            setValue={setLastName}
                            placeholder="LAST NAME"
                            error={errors.lastName}
                        />
                        <InputField
                            className="mb-4"
                            type="password"
                            value={password}
                            setValue={setPassword}
                            placeholder="PASSWORD"
                            error={errors.password}
                        />
                        <button className="w-full py-2 mb-4 text-xs text-white uppercase transition duration-500 bg-blue-500 border border-blue-500 rounded-lg font-b2ld">
                            Submit
                        </button>
                    </form>

                    <small>
                        Already a redditor?
                        <Link href="/login">
                             <a className="ml-1 text-blue-500 uppercase">LOG IN</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Register