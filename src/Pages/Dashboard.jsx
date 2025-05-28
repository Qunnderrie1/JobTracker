import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from '../Components/NavBar'
import { faArrowDown, faArrowRightArrowLeft, faArrowUp, faArrowUp19, faArrowUpLong, faArrowUpRightFromSquare, faEye, faPencilSquare, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate, redirect, useParams } from 'react-router-dom'
import { getJob } from '../Slices/jobSlice'
import wordLength from '../Helper/wordLength';
const Dashboard = () => {

  const [jobModal , setJobModal] = useState(false);
  const [jobEditModal , setJobEditModal] = useState(false);
  const [jobs , setJobs] = useState([{}])
  const [rows , setRows ] = useState(null);
  const [notesModal , setNotesModal] = useState(false)
  const [notes , setNotes] = useState()
 


  // Get current user 
  const { user } = useSelector((state) => state.userAuth)
  // Get selected job by id
  const { jobId } = useSelector((state) => state.currentJobId)
  const dispatch  = useDispatch()


  const  [updateJobs  , setUpdateJobs] = useState({
    companyName: "",
    jobTitle: "",
    appDate: "",
    appStatus: "",
    notes:""
  })


  const  [job, setJob] = useState({
    companyName: "",
    jobTitle: "",
    appDate: "",
    appStatus: "",
    notes: ""
  })



  // Delete Job API Endpoint & Method
  const handleDelete = (id) => {

    axios.delete(`/dashboard/job/${id}`)
    .then(() => console.log("Job has been deleted successfully"))
    .catch((err) => console.log(err))



     axios.get('/dashboard/job')
    .then((res) => setJobs(res.data))
    .catch((err) => console.log(err))




  }

     // Create Job API Endpoint & Method
  const handleCreateJob = () => {

    axios.post("/dashboard/job" , {
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      appDate: job.appDate,
      appStatus: job.appStatus,
      notes: job.notes
    })

    setJobModal(false)

    job.jobTitle = ""
    job.appStatus = ""
    job.companyName = ""
    job.appDate = ""

     axios.get('/dashboard/job')
    .then((res) => setJobs(res.data))
    .catch((err) => console.log(err))

  }


  // Show selected job by user
  const handleUpdateJob = (id) => {
    // get job by id
    dispatch(getJob(id))
    if(id){
     // Show Job Edit Modal
    setJobEditModal(true)
    // Get selected job
    axios.get(`/dashboard/job/${jobId}`)
    .then((res) => setUpdateJobs(res.data))
    .catch((err) => console.log(err))
  
    }

  }



   // Update Job API Endpoint & Method
  const handleSaveChanges = () => {
  
    axios.put(`/dashboard/job/${jobId}` , {
      companyName: updateJobs.companyName,
      jobTitle: updateJobs.jobTitle,
      appDate: updateJobs.appDate,
      appStatus: updateJobs.appStatus,
      notes: updateJobs.notes
    })
    .then((res) => console.log(res.data))
    .catch(() => console.log("Failed to update job!"))

    // Hide Edit Job Modal
    setJobEditModal(false)

    // Reset States 
    job.jobTitle = ""
    job.appStatus = ""
    job.companyName = ""
    job.appDate = ""

    // Get Updated Job API Endpoint
     axios.get('/dashboard/job')
    .then((res) => setJobs(res.data))
    .catch((err) => console.log(err))

  }


   // Get All Jobs API Endpoint
  useEffect(() => {
    axios.get('/dashboard/job')
    .then((res) => {
      if(res.data){
        setJobs(res.data)
      }
    })
    .catch((err) => console.log(err))
  } , [jobs])




  const handleNotesView = () => {
    setNotesModal(true)
    axios.get(`/dashboard/job/${jobId}`)
    .then((res) => setNotes(res.data.notes))
    .catch((error) => console.log(error))

  }

  return (
    <div className='flex flex-col h-[100vh]'>


  {/* Notes Container Modal */}
      <div className={notesModal ? ` bg-black h-[100vh] w-full absolute z-10 bg-opacity-50 flex justify-center items-center` : ` hidden`}>
        <div className='bg-white w-[600px] h-fit py-4 relative  rounded-md px-5'>
          <button onClick={() => setNotesModal(false)} className='btn btn-close absolute right-10'></button>
          <p className='text-center font-semibold text-xl'>Note</p>
            <div className='mt-[20px]'>
              <textarea  value={notes} placeholder='notes goes here....' className='form-control h-[150px] max-h-[150px]'>
              </textarea>
            </div>

        </div>
      </div>




      {/* Add Job Container Modal */}
      <div className={jobModal ? ` bg-black h-[100vh] w-full absolute z-10 bg-opacity-50 flex justify-center items-center` : ` hidden`}>
        <div className='bg-white w-[600px] h-fit py-4 relative  rounded-md px-5'>
          <button onClick={() => setJobModal(false)} className='btn btn-close absolute right-10'></button>
          <div className=' '>
             <p className='text-[26px] font-bold text-center '>Add  Job</p>
          </div>
          <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Company</label>
            <input onChange={(e) => setJob(prev => ({...prev , companyName: e.target.value }))} value={job.companyName} className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Company name' />
          </div>
           <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Job Title</label>
            <input onChange={(e) => setJob(prev => ({...prev , jobTitle: e.target.value }))} value={job.jobTitle} className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Job Title' />
          </div>
          <div className='flex gap-2 w-full justify-between'>
            <div className='mt-[40px] flex-grow-1  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Date Of Application</label>
            <input onChange={(e) => setJob(prev => ({...prev , appDate: e.target.value }))} value={job.appDate} type='date' className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Job Title' />
          </div>
           <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Application Status</label>
            <select onChange={(e) => setJob(prev => ({...prev , appStatus: e.target.value }))} value={job.appStatus} className='form-select'>
              <option value="">Choose Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offer/Decision">Offer/Decision</option>

            </select>
          </div>
            </div>

            <div className='mt-[20px]'>
              <label className='font-semibold pb-2' htmlFor="company">Notes</label>
              <textarea onChange={(e) => setJob(prev => ({...prev, notes : e.target.value}))} value={job.notes} placeholder='notes goes here....' className='form-control disabled:h-[100px] max-h-[100px]'>
              </textarea>
            </div>

          <div className='mt-10 w-full flex gap-4'>
            <button onClick={handleCreateJob} className=' bg-violet-700 text-white rounded-md w-full py-2 font-semibold'>Submit</button>
          </div>

        </div>
      </div>

      {/* Edit Job Container Modal */}
      <div className={jobEditModal ? ` bg-black h-[100vh] w-full absolute z-10 bg-opacity-50 flex justify-center items-center` : `hidden`}>
        <div className='bg-white w-[600px] h-fit py-4  rounded-md px-5'>
          <div className='flex  items-center justify-between '>
             <p className='text-2xl font-bold'>Edit Job</p>
             <button onClick={() => setJobEditModal(false)} className='btn btn-close'></button>
          </div>
          <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Company</label>
            <input onChange={(e) => setUpdateJobs(prev => ({...prev , companyName : e.target.value}))} value={updateJobs.companyName} className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Company name' />
          </div>
           <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Job Title</label>
            <input onChange={(e) => setUpdateJobs(prev => ({...prev , jobTitle : e.target.value}))} value={updateJobs.jobTitle} className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Job Title' />
          </div>
          
            <div className='flex gap-2 w-full justify-between'>
            <div className='mt-[40px] flex-grow-1  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Date Of Application</label>
            <input onChange={(e) => setUpdateJobs(prev => ({...prev , appDate: e.target.value }))} value={updateJobs.appDate} type='date' className='border-2 border-slate-200 py-1 px-2 rounded-md form-control' placeholder='Job Title' />
          </div>
           <div className='mt-[40px]  flex gap-2 flex-col '>
            <label className='font-semibold' htmlFor="company">Application Status</label>
            <select onChange={(e) => setUpdateJobs(prev => ({...prev , appStatus: e.target.value }))} value={updateJobs.appStatus} className='form-select'>
              <option value="">Choose Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offer/Decision">Offer/Decision</option>

            </select>
          </div>
            </div>
          
            <div className='mt-[20px]'>
              <label className='font-semibold pb-2' htmlFor="company">Notes</label>
              <textarea onChange={(e) => setUpdateJobs(prev => ({...prev, notes : e.target.value}))} value={updateJobs.notes} placeholder='notes goes here....' className='form-control disabled:h-[100px] max-h-[100px]'>
              </textarea>
            </div>

  
          <div className='mt-10 w-full flex gap-4'>
            <button onClick={handleSaveChanges} className=' bg-violet-700 text-white rounded-md w-full py-2'>Save Changes</button>
          </div>

        </div>
      </div>


      {/* Navbar Container */}
      <NavBar openJobModal={() => setJobModal(true)} />
      {/* Greeting Container */}
      <div className='container mx-auto mt-[50px]'>
        <p className='text-2xl font-light'>Hello, <span className='font-bold text-violet-600'>{user.username}</span>!</p>
        <p className='text-gray-500'>{user.email}</p>
      </div>
      <div className='mt-[40px] flex gap-7 container mx-auto'>
         {/* Number Of Jobs For Container */}
        <div className='bg-white w-[250px] h-fit rounded-md p-4 border-2 border-violet-300 shadow-md'>
          <p className='font-semibold text-slate-500'>Jobs</p>
          <p className='text-4xl text-violet-500 font-semibold'>{jobs.length}</p>
          <div className='flex gap-2  items-center mt-8'>
             <p className='text-[13px] text-slate-500'>Number Of Job Applications</p>
          </div>
        </div>
          {/* Number Of Pending Applications For Container */}
        <div className='bg-white w-[250px] h-fit rounded-md p-4 border-2 border-violet-300 shadow-md'>
          <p className='font-semibold text-slate-500'>Offer/Decision</p>
          <p className='text-4xl text-violet-500 font-semibold'>{jobs.filter(item => item.appStatus === "Offer/Decision").length}</p>
          <div className='flex gap-2  items-center mt-8'>
             <p className='text-[13px] text-slate-500'>Number Of Offers Recieved</p>
          </div>
        </div>
        {/* Number Of Job Applied For Container */}
        <div className='bg-white w-[250px] h-fit rounded-md p-4 border-2 border-violet-300 shadow-md'>
          <p className='font-semibold text-slate-500'>Applied</p>
          <p className='text-4xl text-violet-500 font-semibold'>{jobs.filter(item => item.appStatus === "Applied").length}</p>
        <div className='flex gap-2  items-center mt-8'>
             <p className='text-[13px] text-slate-500'>Jobs Applied For</p>
          </div>
        </div>
         {/* Number Of Jobs Interviewed For Container */}
        <div className='bg-white w-[250px] h-fit rounded-md p-4 border-2 border-violet-300 shadow-md '>
          <p className='font-semibold text-slate-500'>Interviewed</p>
          <p className='text-4xl text-violet-500 font-semibold'>{jobs.filter(item => item.appStatus === "Interviewed").length}</p>
        <div className='flex gap-2  items-center mt-8'>
             <p className='text-[13px] text-slate-500'>Number Of Interviews</p>
          </div>
        </div>
      </div>
        <div className=' mt-[50px] flex flex-col container mx-aut'> 
          
           <div className='py-4 flex justify-end'>
                <button onClick={() => setJobModal(true)} className=' bg-violet-700 text-white  font-semibold text-1xl rounded-md  py-2 px-4'>+ Add Job</button>
          </div>


         
          <table className='container mx-auto bg-white rounded-md shadow-lg h-[500px] w-full'>
            <thead className='text-center  text-black block relative '>
              <tr className=' rounded-t-lg bg-violet-700 text-white'>
                <td className="font-semibold p-4">ID</td>
                <td className="font-semibold">Company Name</td>
                <td className="font-semibold">Job Title</td>
                <td className="font-semibold">Date Applied</td>
                <td className="font-semibold">Status</td>
                <td className="font-semibold">Notes</td>
                <td className="font-semibold">Update</td>
              </tr>
              
            </thead>
            <tbody className=' text-center block overflow-auto   '>
              {
                jobs ? jobs.map((job) => {
                  return  <tr>
                <td className='p-4'>
                  <button>
                    {wordLength(job._id)}
                  </button>
                </td>
                <td className=''>{job.companyName}</td>
                <td className=''>{job.jobTitle}</td>
                <td className=''>{job.appDate}</td>
                <td className=''>{job.appStatus}</td>
                <td className=''>
                  <button onClick={() => handleNotesView(job._id)} className='text-blue-600 underline'>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td>
                   <div className='flex justify-center gap-4'>
                    <button onClick={() => handleUpdateJob(job._id)} >
                      <FontAwesomeIcon className='text-blue-600' icon={faPenClip} />
                    </button>
                     <button onClick={() => handleDelete(job._id)}>
                       <FontAwesomeIcon className='text-red-600' icon={faTrashCan} />
                    </button>
                  </div>
                </td>
                </tr>
                }) : <tr><td></td></tr>
              }
             
            </tbody>
            <tfoot>
          
            </tfoot>
          </table>
        </div>

        <footer className='container mx-auto  mt-[100px]'>
          <p className='text-center'>Copyright &copy;2025 & Developed by Qunnderrie</p>
        </footer>
        
    </div>
  )
}

export default Dashboard