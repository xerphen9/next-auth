"use client"

import React, {useRef, useState} from 'react'
import { ValidationEmail } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast, {Toaster} from 'react-hot-toast'
import {Button} from '@/components/Button'
import axios from 'axios'
import { useSession, signIn } from 'next-auth/react'

export default function Home() {
  const router = useRouter()
  const ref = useRef<null | HTMLButtonElement>()
  // const {data: session, status, update} = useSession()
  // console.log('useSession', session)
  const [field, setField] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  })

  const handleLoginButton = async () => {
    if(ValidationEmail(field.email) && field.password !== '') {
      try {
        signIn('credentials', {
          ...field,
          redirect: false,
        })
        toast.success("Signin Success!")
        setTimeout(() => {
          router.push('/')
        }, 1000);
      } catch (error) {
        toast.error(error.response.data.error)
      }
    } else{
      toast.error('Email or Password is invalid')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="w-full lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
        <form className="bg-white px-10 pt-6 pb-8 mb-4 rounded-2xl shadow-2xl">
          <div className="mb-6">
            <label className="block text-black text-2xl font-bold mb-2">
              Sign In
            </label>
          </div>
          <div className="mb-4 grid grid-cols-2 space-x-4">
            <div onClick={() => signIn('facebook')} className='flex bg-white space-x-2 border items-center justify-center rounded-lg px-2 py-2 shadow-xl hover:shadow-none hover:cursor-pointer hover:ring-2 transition delay-50'>
              <Image src='/facebook_logo.png' alt="" width={30} height={30}/>
              <label className='text-black mt-[3px] font-bold hover:cursor-pointer'>Facebook</label>
            </div>
            <div onClick={() => signIn("google")} className='flex bg-white space-x-2 border items-center justify-center rounded-lg px-2 py-2 shadow-xl hover:shadow-none hover:cursor-pointer hover:ring-2 transition delay-50'>
              <Image src='/google_logo.png' alt="" width={30} height={30}/>
              <label className='text-black mt-[3px] font-bold hover:cursor-pointer'>Google</label>
            </div>
          </div>
          <div className='mt-10 mb-5'>
            <label className="block" htmlFor='email'>
              <span className='block text-sm font-medium text-slate-700'>
                Email
              </span>
              <input className={"peer shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" } 
                   type='email' 
                   placeholder='example@example.com'
                   onChange={(e) => setField({...field, email: e.target.value})}
              />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a valid email address.
              </p>
            </label>
            <label className="block" htmlFor='password'>
              <span className='block text-sm font-medium text-slate-700'>
                Password
              </span>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"  
                   type='password' 
                   placeholder='Password'
                   onChange={(e) => setField({...field, password: e.target.value})}
              />
            </label>
          </div>
          <div>
            <Button size='long' variant='default' onClick={handleLoginButton}>
              Sign In
            </Button>
          </div>
          <div className='pt-5 flex justify-center'>
            <label>If you don't have an account, Please <span><a href="/signup" className='text-blue-500 hover:text-blue-700'>register here</a></span></label>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </form>
      </div>
    </main>
  )
}