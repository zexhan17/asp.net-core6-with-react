import React, { useEffect, useState } from 'react'
import { Compaign } from '../lib/Compaign'
import { GetProfileDetails } from '../services/User.service'
import { GetCompaignsById } from '../services/Compaign.service'
import { toast } from 'react-toastify'

const Profile = ({ role, options }) => {

  const [user, setUser] = useState({});
  const [compaigns, setCompaigns] = useState([]);

  useEffect( () => {
    GetProfileDetails()
      .then((res)=>{setUser(res.data)})
      .catch((error)=>{
        toast.error(error.response.data, options)
      })
    if(role == "comp"){
      let u = JSON.parse(localStorage.getItem("User"))
      GetCompaignsById(u.id)
        .then((res)=>{setCompaigns(res.data)})
        .catch((error)=>{
          toast.error(error.response.data, options)
        })
    }
  }, [])

  return (
    <div className='pt-10 pb-10 grid place-content-center'>
      <div className='my-10 px-10 md:px-0 md:w-[30rem] mx-auto'>
        <h1 className='text-2xl font-bold py-2 text-center'>{user.name}</h1>
        <ul>
          <li className='flex justify-between p-4 bg-base-300 rounded-t-xl'>username <span>@{user.userName}</span></li>
          <li className='flex justify-between p-4 bg-base-200'>email <span>{user.email}</span></li>
          <li className='flex justify-between p-4 bg-base-300'>phone <span> +92{user.phoneNumber}</span></li>
          { role == "donor" && 
            <li className='flex justify-between p-4 bg-base-200'>donations <span>{user.donations}</span></li>
          }
          { role == 'comp' && 
            <>
              <li className='flex justify-between p-4 bg-base-200'>receivings <span>{user.receivings}</span></li>
              <li className='flex justify-between p-4 bg-base-300'>your compaigns <span>{user.compaigns}</span></li>
              {/* <li className='flex justify-between p-4 bg-base-200'>account <span>23514632461541</span></li> */}
              <li className='flex justify-between p-4 bg-base-200'>gc roll no. <span>{user.gc_Roll_No}</span></li>
              <li className='flex justify-between p-4 bg-base-300'>college roll no. <span>{user.clg_Roll_No}</span></li>
            </>
          }
          <li className={`md:flex justify-between p-4 rounded-b-xl ${role == 'comp' ? 'bg-base-200' : 'bg-base-300'} `} >id <span className='block text-end'>{user.id}</span></li>
        </ul>
      </div>
      {role == 'comp' && compaigns.length > 0 && 
        <div className='grid place-content-center md:block'>
          <div className="text-2xl font-bold justify-between items-center flex px-2">
            <h1 className=''>YOUR COMPAIGNS</h1>
            <h1 className=' pr-1'>Total: {compaigns.length}</h1>
          </div>
            {compaigns.map(c => {
              return (
                <Compaign key={c.id} compaign={c} owner={true} auth={true} />
              )
            })}
        </div>
      }
    </div>
  )
}

export default Profile;