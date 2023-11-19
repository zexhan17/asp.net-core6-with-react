import { useEffect, useState } from 'react'
import { GetAllDonors } from '../../services/Admin.service'

export default function Donors ({options}){
    
    const [fetchData, setFetchData] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect( () => {
        GetAllDonors()
        .then((res)=>{
            setFetchData(res.data)
            setUsers(res.data);
        })
        .catch((error)=>{
            toast.error(error.response.data, options);
        }) 
    }, [])

    return(
        <>
            <div className="pt-24 pb-10 grid place-content-center">
                <div className='md:flex justify-between mb-2'>
                    <div className="flex md:mb-5 items-center md:mr-4">
                        <label className="label">
                            <span className="label-text">Search By ID, Email or Username</span>
                        </label>
                        <input type="search" onChange={(e) => filterTable(e.target.value)} className="input input-bordered h-8 ml-3" />
                    </div>
                    <span className='md:mt-1'>Total Donors <span className='badge badge-primary'>{fetchData.length}</span></span>
                </div>
                <table className="w-[26rem] md:w-full">
                    <thead>
                        <tr className="bg-base-300">
                            <th className="p-3 pl-2 text-left">Id</th>
                            <th className="p-3 pl-2 text-left">Name</th>
                            <th className="p-3 pl-2 text-left">Username</th>
                            <th className="p-3 pl-2 text-left">Email</th>
                            <th className="p-3 pl-2 text-left">Phone</th>
                            <th className="p-3 pl-2 text-left">Role</th>
                            <th className="p-3 pl-2 text-left">Donations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => {
                            return(
                                <tr key={u.id} className="even:bg-base-300 odd:bg-base-200">
                                    <td className="p-2 text-left " data-cell="id">{u.id}</td>
                                    <td className="p-2 text-left " data-cell="name">{u.name}</td>
                                    <td className="p-2 text-left " data-cell="username">{u.userName}</td>
                                    <td className="p-2 text-left " data-cell="email">{u.email}</td>
                                    <td className="p-2 text-left " data-cell="phone">{u.phoneNumber}</td>
                                    <td className="p-2 text-left " data-cell="role">{u.role}</td>
                                    <td className="p-2 text-left " data-cell="donataions">{u.donations}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )  

    function filterTable(value) {
        if (value == '') setUsers(fetchData);
        if (value != '') setUsers(fetchData.filter(f => f.id.includes(value) || f.userName.includes(value) || f.email.includes(value) ))
    }
}
