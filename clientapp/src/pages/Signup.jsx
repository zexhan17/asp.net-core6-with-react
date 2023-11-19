import { useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Register } from '../services/Auth.service';

const Signup = ({optoins}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [compaigner, setCompaigner] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [account, setaccount] = useState('');
    const [gcRoll, setgcRoll] = useState("");
    const [clgRoll, setclgRoll] = useState("");
    // const [img, setimg] = useState(null);
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{9,}$/);
    
    return (
        <div className="grid place-items-center pt-20">
            <div className="md:p-10 py-10 px-2 w-80 md:w-[35rem]">
                <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="email" value={email} onChange={e => setemail(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input type="number" value={phone} onChange={e => setphone(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" value={password} onChange={e => setpassword(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" value={Cpassword} onChange={e => setCpassword(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1">
                    <div className='flex items-center'>
                        <span className="label-text">Are you compaigner</span>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </label>
                            <div tabIndex={0} className="card compact dropdown-content shadow bg-base-100 rounded-box w-64">
                                <div className="card-body">
                                    <h2 className="card-title">Compaigner!</h2>
                                    <p>Can request for compaigns!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" onClick={(event) => toggleCompaigner(event)} className="cursor-pointer checkbox checkbox-sm" />
                </div>
                {compaigner &&
                    <>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Account Number</span>
                            </label>
                            <input type="number" value={account} onChange={e => setaccount(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">GC Role Number</span>
                            </label>
                            <input type="number" value={gcRoll} onChange={e => setgcRoll(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">College Role Number</span>
                            </label>
                            <input type="number" value={clgRoll} onChange={e => setclgRoll(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Your College Card Picture</span>
                            </label>
                            <input type="file" onChange={(e) => setimg(e.target.files[0])} className="file-input w-full max-w-xs file-input-ghost border-gray-300" />
                        </div> */}
                    </>
                }
                <button className="btn btn-primary w-full mt-5 mb-3" disabled={loading} onClick={signUp}>Signup</button>
                <p >Already, have an account? <NavLink to="/login"className='text-info cursor-pointer'>Login</NavLink></p>
            </div>
        </div>
    )

    async function signUp(){
        try {
            if(!emailRegex.test(email)){
                toast.warning("Email is not correct", optoins)
                setLoading(false)
                return
            }
            if(!passwordRegex.test(password)){
                toast.warning("Password must be 9 letters, one capital, one special character and one numeric character", optoins)
                setLoading(false)
                return
            }
            setLoading(true);
            if(!validateInput()) {
                toast.warning("Fields are required!", optoins);
                setLoading(false)
                return;
            }
            let data = buildForm();
            await Register(data);
            toast.success("You can now login to your account 🥳", optoins) 
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data, optoins)
        }
        finally{
            setLoading(false)
        }
    }

    function toggleCompaigner(event) {
        if (event.target.checked) {
            setCompaigner(true);
        }
        else {
            setCompaigner(false);
        }
    }

    function validateInput(){
        if(password != Cpassword){
            return false;
        }
        if( name != "" && phone != "" ){
            if(compaigner){
                if( gcRoll != "" && clgRoll != "" && img != null ) {
                    return true;
                }
                else{
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function buildForm(){
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("phoneNumber", phone);
        data.append("passwordHash", password);
        data.append("role", compaigner ? "comp" : "donor")
        if(!compaigner){
            return data;
        }
        data.append("gc_Roll_No", gcRoll);
        data.append("clg_Roll_No", clgRoll);
        data.append("account", account);
        // data.append("file", img );
        return data;
    }
}

export default Signup