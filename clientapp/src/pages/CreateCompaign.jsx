import { Navigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { createCompaign } from "../services/Compaign.service";
import { eligibleForCompaign } from "../services/User.service";

const CreateCompaign = ({ role, options }) => {

  const [funded, setFunded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredMoney, setRequiredMoney] = useState("");
  const [loading, setLoading] = useState(false);
  const [eligible, setEligible] = useState();

  useEffect(() => {
    eligibleForCompaign()
      .then(res => { })
      .catch(err => {
        toast.error("you are not eligible to post compaign, visit admin", options);
        setEligible(true);
      })
  }, []);

  if (role != "comp" || eligible == false) return <Navigate to='../' />

  return (
    <div className='mt-20 mx-auto w-80 md:w-[35rem] lg:w-[40rem] mb-10'>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Title</span>
        </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="fee support, book need, project support, etc..." className="input input-bordered w-full" />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Description</span>
        </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea textarea-bordered' cols="30" rows="8"></textarea>
      </div>
      <div className="form-control" onClick={(event) => event.target.checked ? setFunded(true) : setFunded(false)}>
        <label className="label cursor-pointer">
          <span className="label-text">Funded Compaign ?</span>
          <input type="checkbox" className="checkbox" />
        </label>
      </div>
      {funded &&
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Amount You Need</span>
          </label>
          <input value={requiredMoney} onChange={(e) => setRequiredMoney(e.target.value)} type="number" className="input border-gray-300 " min="1" placeholder='Rupees' />
        </div>
      }
      <button className="btn btn-primary mt-3 w-full" disabled={loading} onClick={create}>Post</button>
    </div>
  )

  function create() {

    if (title == "" || description == "") {
      toast.warning("Fields are empty!", options)
      return;
    }
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("User"));

    let data = {
      title,
      description,
      authorId: user.id,
      funded,
      donatedMoney: '0',
    }
    if (funded) {
      data.requiredMoney = requiredMoney;
    }

    createCompaign(data)
      .then((res) => {
        toast.success("Post Successfully!", options);
        setTitle("");
        setDescription("");
        setFunded(false);
        setRequiredMoney("");
      })
      .catch((err) => {
        toast.error("sorry! system error", options);
      })

    setLoading(false)
  }
}

export default CreateCompaign