import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
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
                    <form>
                        <div className="mb-6">
                            <input 
                                type="checkbox" 
                                className="mr-1 cursor-pointer" 
                                id="agreement"
                            />
                            <label htmlFor="agreement" className="text-xs cursor-pointer">
                                I agree to get emails about cool stuff on Reddit
                            </label>
                        </div>
                        <div className="mb-2">
                            <input 
                                type="text"
                                className="w-full px-3 py-2 bg-gray-100 border-gray-400 rounded-lg"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                type="text"
                                className="w-full px-3 py-2 bg-gray-100 border-gray-400 rounded-lg"
                                placeholder="Nick"
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                type="text"
                                className="w-full px-3 py-2 bg-gray-100 border-gray-400 rounded-lg"
                                placeholder="First name"
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                type="text"
                                className="w-full px-3 py-2 bg-gray-100 border-gray-400 rounded-lg"
                                placeholder="Last name"
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                type="password"
                                className="w-full px-3 py-2 bg-gray-100 border-gray-400 rounded-lg"
                                placeholder="Password"
                            />
                        </div>
                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded-lg">
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