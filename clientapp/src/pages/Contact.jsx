import { useState } from "react"
import { contact } from "../services/User.service";
import { toast } from "react-toastify";

export const Contact = ({ options }) => {

  const [msg, setMsg] = useState("");

  return (
    <div className='mt-20 mx-auto w-80 md:w-[35rem] lg:w-[40rem] mb-10'>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Your message</span>
        </label>
        <textarea className='textarea textarea-bordered' value={msg} onChange={(e) => setMsg(e.target.value)} cols="30" rows="8"></textarea>
      </div>
      <button className="btn btn-primary mt-3 w-full" onClick={submit}>Submit</button>
    </div>
  )

  function submit(){
    if(msg == ""){
      return;
    }
    let user = JSON.parse(localStorage.getItem("User"));
    contact({text: msg, sender: user.id})
      .then((res)=>{
        setMsg("");
        toast.success("success", options);
      })
      .catch((err)=>{
        toast.error(err.response.data, options)
      })
  }
}