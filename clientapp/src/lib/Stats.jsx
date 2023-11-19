import { useEffect, useState } from "react"
import { GetStats } from "../services/User.service"
import { toast } from "react-toastify"

export const Stats = () => {

    const [stats, setStats] = useState({});

    useEffect(()=>{
        GetStats()
            .then((res)=>{
                setStats(res.data)
            })
            .catch((err)=>{
                toast.error(err)
            })
    }, [])

    return (
        <>
            {/* <div className="stat">
                <div className="stat-title">Donated</div>
                <div className="stat-value">{stats.donated}</div>
            </div> */}

            <div className="stat">
                <div className="stat-title">Compaigns Completed</div>
                <div className="stat-value">{stats.compaignsCompleted}</div>
            </div>

            <div className="stat">
                <div className="stat-title">Need</div>
                <div className="stat-value">{stats.needed}</div>
            </div>
        </>
    )
}