import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/Auth.service';

const Login = ({ login, options }) => {

    const [loading, setLoading] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    return (
        <div className="grid place-items-center h-screen">
            <div className="md:p-10 py-10 px-2 w-80 md:w-[35rem]">
                <h1 className="text-3xl font-bold mb-8">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="email" placeholder="example@email.com" value={email} onChange={e => setemail(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="*******" value={password} onChange={e => setpassword(e.target.value)} className="input input-bordered w-full" />
                </div>
                <button className={`btn btn-primary w-full mt-5 mb-3 ${loading == true ? 'loading' : ''} `} disabled={loading} onClick={Login}>Login</button>
                <p >Don’t have an account yet? <NavLink to="/signup" className='text-info cursor-pointer'>Signup</NavLink></p>
            </div>
        </div>
    )

    function Login(){
        setLoading(true);
        let data = {
            email,
            password
        }
        loginUser(data)
            .then( (res) => {
                data = res.data;
                localStorage.setItem("AuthToken", JSON.stringify(data.token));
                localStorage.setItem("User", JSON.stringify(data));
                login();
            })
            .catch((err) => {
                if(err.message == "Network Error"){
                    toast.error(err.message, options)
                }
                toast.error(err.response.data, options)
            })

        setLoading(false)
    }
}

export default Login