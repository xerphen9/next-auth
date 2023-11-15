"use client"

import React, {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import Alert from '@/components/Alert';
import Button from '@/components/Button';

type Field = {
    name: string,
    phone: number,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const router = useRouter()
    const [field, setField] = useState<Field>({
        name: '',
        phone: 0,
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(false)

    const showAlert = (alert: boolean) => {
        setAlert(alert)
    }

    const handleLoginSignUpButton = async () => {
        if(field.confirmPassword !== field.password) {
            setAlert(true)
        } else {
            try {
                await axios.post("/api/users/signup", {
                    name: field.name,
                    phone: field.phone,
                    email: field.email,
                    password: field.password
                })
                toast.success("Signup Success!")
                setTimeout(() => {
                    router.push('/login')
                }, 1000);
            } catch (error) {
                toast.error(error.response.data.error)
            }
        }
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-sm">
                <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-2xl">
                    <div className="mb-6">
                        <label className="block text-black text-2xl font-bold mb-3">
                        Sign Up
                        </label>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Full Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                   id="inline-full-name" 
                                   type="text"
                                   value={field.name}
                                   onChange={(e) => setField({...field, name: e.target.value})}
                                   required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                   id="inline-email" 
                                   type="text"
                                   value={field.email}
                                   onChange={(e) => setField({...field, email: e.target.value})}
                                   required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-phone">
                                Phone
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                   id="inline-phone" 
                                   type="number"
                                   value={field.phone}
                                   placeholder='08xxxxxxxx'
                                   onChange={(e) => setField({...field, phone: e.target.valueAsNumber})}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                   id="inline-password" 
                                   type="password"
                                   value={field.password}
                                   onChange={(e) => setField({...field, password: e.target.value})}
                                   required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-confirm-password">
                                Confirm Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                   id="inline-confirm-password" 
                                   type="password"
                                   value={field.confirmPassword}
                                   onChange={(e) => setField({...field, confirmPassword: e.target.value})}
                                   required
                            />
                        </div>
                    </div>
                    {alert ? <Alert showAlert={showAlert} message=' Please make sure your password!'/> : null}
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <Button name='Sign Up' width={null} bgColor='purple' func={handleLoginSignUpButton}/>
                            <Toaster position="top-center" reverseOrder={false} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}