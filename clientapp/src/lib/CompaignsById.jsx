import { useState } from "react"
import { Collapse } from "./Collapse"
import { GetCompaignsById } from "../services/Compaign.service"
import { toast } from "react-toastify";
import { Compaign } from "./Compaign";

export const CompaignsById = ({ options }) => {

    const [compaigns, setCompaigns] = useState([]);
    const [id, setId] = useState("");
    
    return (
        <>
            <Collapse text="Get compaign by id">
                <input type="text" placeholder="*******" onChange={(e) => setId(e.target.value)} className="input input-bordered w-full" />
                <button className="btn btn-primary mt-5 mb-3" onClick={getCompaigns}>Fetch</button>
            </Collapse>
            {compaigns.map(c => {
              return (
                <Compaign key={c.id} compaign={c} role={"admin"} owner={true} auth={true} />
              )
            })}
        </>
    )

    function getCompaigns(){
        if(id == ""){
            toast.warning("Id is required!", options)
            return;
        }
        GetCompaignsById(id)
            .then((res)=>{setCompaigns(res.data)})
            .catch((error)=>{
            toast.error(error.response.data)
            })
    }
}