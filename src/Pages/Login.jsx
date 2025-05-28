import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin , userLogout} from '../Slices/User.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

    const [email , setEmail ] = useState("")
    const [password , setPassword ] = useState("")


    const {isAuth , user , msg} = useSelector(state => state.userAuth)

    const dispatch = useDispatch()

    const navigate = useNavigate();


    const handleLogin = () => {
        // User Login
        axios.post("/user/login" , {
            email: email,
            password: password
        }).then((res) => {
            if(res.data){
                dispatch(userLogin(res.data))
                console.log(res.data)
                navigate('/dashboard')
                
            }
        })
        .catch(() => console.log("Failed to login user in"))

    }


  return (
    <div className=' flex justify-center items-center h-[100vh]'>
        <div className='bg-white w-[600px] h-fit px-10  py-10 rounded-md border-2 border-slate-200'>
            <p className='text-3xl font-bold text-center'>Login</p>
            <div>


            </div>
            <div>
                <div className='mt-10 flex flex-col gap-2'>
                    <p className='font-semibold'>Email Address</p>
                    <input onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder="Email Address" />
                </div>
                 <div className='mt-10 flex flex-col gap-2'>
                    <p className='font-semibold'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' className='form-control' placeholder="Enter Password" />
                </div>
                <button onClick={handleLogin} className='bg-violet-700 w-full mt-4 py-2 rounded-sm text-white font-semibold text-[20px]'>Login</button>
            </div>
            <div className='mt-4 flex justify-center gap-2'>
               <p className='text-center'>New user?</p>
               <Link to="/signup" className='text-violet-600 font-semibold'>Sign Up</Link>

            </div>

        </div>
  
    </div>
  )
}

export default Login