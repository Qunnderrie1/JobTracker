import { createSlice } from "@reduxjs/toolkit"


const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobId: "",
    },

    // Note: no commas after state values
    reducers: {
        getJob:(state , actions) => {
            state.jobId = actions.payload
        },
    }

})


export const {getJob} = jobSlice.actions;

export default jobSlice.reducer