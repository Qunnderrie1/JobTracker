import  { configureStore } from '@reduxjs/toolkit' 

import UserReducer from '../src/Slices/User.js'
import jobReducer from '../src/Slices/jobSlice.js'

export const store = configureStore ({
     reducer: {
        userAuth: UserReducer,
        currentJobId: jobReducer
     },
})




export default store