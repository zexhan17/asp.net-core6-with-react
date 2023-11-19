import { useState, useEffect } from 'react';
import { GetAllCompaigners } from '../../services/Admin.service'
import { ImgModal } from '../../lib/ImgModal';

export default function Compaigners ({options}){
    
    const [fetchData, setFetchData] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect( () => {
        GetAllCompaigners()
        .then((res)=>{
            setFetchData(res.data)
            setUsers(res.data);
        })
        .catch((error)=>{
            toast.error(error.response.data, options);
        })    
    }, [])
    
    return(
        <div className="pt-24 pb-10 grid place-content-center">
            <div className='md:flex justify-between mb-2 '>
                <div className="md:flex mb-5 items-center">
                    <label className="label">
                        <span className="label-text">Search By ID, Username, Roll No</span>
                    </label>
                    <input type="search" onChange={(e) => filterTable(e.target.value)} className="input input-bordered h-8 md:ml-3 w-full md:w-auto" />
                </div>
                <span className='md:mt-1'>Total Compaigners <span className='badge badge-primary'>{fetchData.length}</span></span>
            </div>
            <table className="w-[26rem] md:w-full mx-auto md:mx-0">
                <thead>
                    <tr className="bg-base-300">
                        <th className="p-3 pl-2 text-left">Id</th>
                        <th className="p-3 pl-2 text-left">Name</th>
                        <th className="p-3 pl-2 text-left">Username</th>
                        <th className="p-3 pl-2 text-left">Email</th>
                        <th className="p-3 pl-2 text-left">Phone</th>
                        <th className="p-3 pl-2 text-left">Role</th>
                        <th className="p-3 pl-2 text-left">Receivings</th>
                        <th className="p-3 pl-2 text-left">Compaigns</th>
                        <th className="p-3 pl-2 text-left">Clg#</th>
                        <th className="p-3 pl-2 text-left">Gc#</th>
                        {/* <th className="p-3 pl-2 text-left">Std_Card</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return(
                            <tr key={u.id} className="even:bg-base-300 odd:bg-base-200">
                                <td className="p-2 text-left trim" data-cell="id">{u.id}</td>
                                <td className="p-2 text-left " data-cell="name">{u.name}</td>
                                <td className="p-2 text-left " data-cell="username">{u.userName}</td>
                                <td className="p-2 text-left " data-cell="email">{u.email}</td>
                                <td className="p-2 text-left " data-cell="phone">{u.phoneNumber}</td>
                                <td className="p-2 text-left " data-cell="role">{u.role}</td>
                                <td className="p-2 text-left " data-cell="receivings">{u.receivings}</td>
                                <td className="p-2 text-left " data-cell="Compaigns">{u.compaigns}</td>
                                <td className="p-2 text-left " data-cell="clg_roll_no">{u.clg_Roll_No}</td>
                                <td className="p-2 text-left " data-cell="gc_roll_no">{u.gc_Roll_No}</td>
                                {/* <td className="p-2 text-left  cursor-pointer" data-cell="image"> <ImgModal src={"img/logo.svg"} id={u.id}/> </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

    function filterTable(value) {
        if (value != '') setUsers(fetchData.filter(f => {
            return (f.id.includes(value) || f.userName.includes(value) || f.clg_Roll_No.includes(value) || f.gc_Roll_No.includes(value)) || f.email.includes(value) }))
        if (value == '') setUsers(fetchData);
    }
}
