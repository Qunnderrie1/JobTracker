import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin , userLogout} from '../Slices/User.js'
const SignUp = () => {

    const dispatch = useDispatch();


    const [user, setUser ] = useState({
        username:"",
        email: "",
        password:""
    })

        const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSignUp = () => {

            if(user.email == "" || user.password == "" || user.username == ""){
                console.log("Please enter information")

            }else{
                axios.post('/user/signup' , {
                    username: user.username,
                    email: user.email,
                    password: user.password
                })
                .then((res) => {
                    if(res.status == 200){
                        dispatch(userLogin(res.data))
                        navigate("/dashboard")
                    }
                })
                .catch(() => console.log("Failed to sign up user!"))
                
            }

    }


 
  return (
    <div className=' flex justify-center items-center h-[100vh]'>
        <div className='bg-white w-[600px] h-fit px-10  py-10 rounded-md border-2 border-slate-200'>
            <form onSubmit={handleSubmit}>
            <p className='text-3xl font-bold text-center'>Create an account</p>
            <p className='text-center text-slate-400 font-semibold mt-2'>Fill out the information to get started</p>
            <div>
                <div className='mt-10 flex flex-col gap-2'>
                    <p className='font-semibold'>Username</p>
                    <input onChange={(e) => setUser(prev => ({...prev , username: e.target.value}))} className='form-control' placeholder="Username" />
                </div>
                <div className='mt-10 flex flex-col gap-2'>
                    <p className='font-semibold'>Email Address</p>
                    <input type='email' onChange={(e) => setUser(prev => ({...prev, email : e.target.value}))} className='form-control' placeholder="Email Address" />
                </div>
                 <div className='mt-10 flex flex-col gap-2'>
                    <p className='font-semibold'>Password</p>
                    <input  onChange={(e) => setUser(prev => ({...prev, password : e.target.value}))} type='password' className='form-control' placeholder="Enter Password" />
                </div>
                <button onClick={handleSignUp} className='bg-violet-700 w-full mt-4 py-2 rounded-sm text-white font-semibold text-[20px]'>Sign Up</button>
            </div>
              </form>
            <div className='mt-4 flex justify-center gap-2'>
               <p className='text-center'>Already have an account?</p>
               <Link to="/login" className='text-violet-600 font-semibold'>Login</Link>

            </div>

        </div>
    </div>
  )
}

export default SignUp