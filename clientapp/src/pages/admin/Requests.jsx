import { useState, useEffect } from "react";
import { getRequests, Verify } from '../../services/Admin.service'
import { ImgModal } from "../../lib/ImgModal";

export default function Requests({options}){
    
    const [fetchData, setFetchData] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect( () => {
        getRequests()
        .then((res)=>{
            setFetchData(res.data)
            setUsers(res.data);
        })
        .catch((error)=>{
            toast.error(error.response.data, options);
        }) 
    }, [])

    function filterTable(value) {
        console.log(value)
        if (value != '') setUsers(fetchData.filter(f => {
            return (f.name.includes(value) || f.Clg_Roll_No.includes(value) || f.Gc_Reg_No.includes(value) || f.Gc_Roll_No.includes(value)) }))
        if (value == '') setUsers(fetchData);
    }

    return(
        <div className="pt-24 pb-10 grid place-content-center">
            <div className="md:flex mb-5 items-center">
                <label className="label">
                    <span className="label-text">Search By ID, Username, Roll No, Reg No</span>
                </label>
                <input type="search" onChange={(e) => filterTable(e.target.value)} className="input input-bordered h-8 md:ml-3 w-full md:w-auto" />
            </div>
            <table className="w-[26rem] md:w-full mx-auto md:mx-0">
                <thead>
                    <tr className="bg-base-300">
                        <th className="p-3 pl-2 text-left">Name</th>
                        <th className="p-3 pl-2 text-left">College Roll No</th>
                        <th className="p-3 pl-2 text-left">Gc Roll No</th>
                        {/* <th className="p-3 pl-2 text-left">Student Card</th> */}
                        <th className="p-3 pl-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( (u, index) => {
                        return(
                            <tr key={index} className="even:bg-base-300 odd:bg-base-200">
                                <td className="p-2 text-left " data-cell="name">{u.name}</td>
                                <td className="p-2 text-left " data-cell="clg_roll_no">{u.clg_Roll_No}</td>
                                <td className="p-2 text-left " data-cell="gc_roll_no">{u.gc_Roll_No}</td>
                                {/* <td className="p-2 text-left cursor-pointer" data-cell="image"> <ImgModal src={u.clgCard} id={u.id}/> </td> */}
                                <td className="p-2 flex" data-cell="Action">
                                    <button className="ml-[4.5rem] md:ml-0 btn btn-primary btn-sm mr-3" onClick={() => verify(u.id)}>Accept</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

    async function verify(id){
        try{
            await Verify(id);
            setUsers(users.filter(f => f.id != id));
        }
        catch{

        }
    }
}