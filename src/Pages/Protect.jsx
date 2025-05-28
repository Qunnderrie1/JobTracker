
import  {  useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from './Login'



const Protect = () => {

    const { isAuth } =  useSelector(state => state.userAuth)

    {
      console.log(isAuth)
    }


  return isAuth ? <Outlet /> : <Login />
}

export default Protect