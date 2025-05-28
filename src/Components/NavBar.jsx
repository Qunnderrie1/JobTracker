import { faArrowRightFromBracket, faContactCard, faFlag, faHome, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../Slices/User'
const NavBar = () => {

  const [userOption,  setUserOption] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAuth , user} = useSelector(state => state.userAuth)

  console.log(user)




  useEffect(() => {

    switch(userOption){
      case "logout":{
        axios.post('/user/logout')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      dispatch(userLogout())
      navigate('/login')
      break;
      }
      case "delete":{
        axios.delete(`/user/${user._id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      dispatch(userLogout())
      navigate('/login')
       break;
      }
    }

    setUserOption("")

  } , [userOption])

  return (

    <div className='bg-violet-800'>
        <nav className=' container mx-auto flex h-fit w-[100%] justify-between  text-black py-4 '>
          <h1 className='text-white text-2xl font-bold'>Job Tracker </h1>
          <div>
            <select onChange={(e) => setUserOption(e.target.value)} value={userOption} className='form-select'>
              <option className='font-semibold' value="">{user.username}</option>
              <option className='  font-semibold' value="logout">Logout</option>
              <option className=' text-red-700 font-semibold' value="delete">Delete Account</option>
            </select>
          </div>
         
        </nav>
    </div>
  )
}

export default NavBar