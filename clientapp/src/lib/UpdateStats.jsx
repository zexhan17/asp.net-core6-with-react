import { useState } from "react";
import { Collapse } from "./Collapse";
import { toast } from "react-toastify";
import { updateStats } from '../services/Admin.service';

export const UpdateStats = ({options}) => {

    const [donated, setDonated] = useState(0);
    const [compaignsCompleted, setCompaigns] = useState(0);
    const [needed, setNeeded] = useState(0);
    const [loading, setLoading] = useState();


    return (
        <Collapse text="Update Statistics">
            <input type="number" value={donated} onChange={(event) => setDonated(event.target.value)} placeholder="donated" className="input input-bordered  block w-full" />
            <input type="number" value={compaignsCompleted} onChange={(event) => setCompaigns(event.target.value)} placeholder="compaigns completed" className="input input-bordered  block w-full" />
            <input type="number" value={needed} onChange={(event) => setNeeded(event.target.value)} placeholder="needed" className="input input-bordered  block w-full" />
            <button className="btn btn-primary mt-5 mb-3" disabled={loading} onClick={update}>update</button>
        </Collapse>
    )

    function update(){
        setLoading(true);
        let data = {
            donated,
            compaignsCompleted,
            needed
        }

        updateStats(data)
            .then((res)=>{
                data = res.data
                setDonated(data.donated);
                setCompaigns(data.compaignsCompleted);
                setNeeded(data.needed);
                toast.success("Success 🤩", options);
                setDefaultValues();
            })
            .catch((errors)=>{
                toast.error("can't update", options);
            })

        setLoading(false);
    }

    function setDefaultValues(){
        setDonated(0);
        setCompaigns(0);
        setNeeded(0);
    }
}