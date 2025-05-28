import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        errorMsg: "",
        isAuth : false,
        isLoading: false,
        msg: ""
    },

    // Note: no commas after state values
    reducers: {
        userLogin:(state, action) => {
            state.user = action.payload
            state.errorMsg = ""
            state.isLoading = false
            state.isAuth = true

        },
        userLogout:(state) => {
            state.user = {}
            state.errorMsg = ""
            state.isAuth = false
            state.isLoading = false
            state.msg = "You successfully logged out."


        }
    }

})


export const {userLogin , userLogout} = userSlice.actions;

export default userSlice.reducer