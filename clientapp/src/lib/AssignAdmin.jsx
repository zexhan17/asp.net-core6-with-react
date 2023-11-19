import { useState } from "react";
import { Collapse } from "./Collapse";
import { toast } from 'react-toastify';
import { assignAdmin } from '../services/Admin.service'

export const AssignAdmin = ({ options }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{9,}$/);

    return (
        <Collapse text="Create New Admin">
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" className="input input-bordered w-full block" />
            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="input input-bordered w-full block" />
            <button onClick={assign} className="btn btn-primary mt-5 mb-3">Assign</button>
        </Collapse>
    )

    async function assign() {
        if (!emailRegex.test(email)) {
            toast.warning("Email is not correct", options)
            return
        }
        if (!passwordRegex.test(password)) {
            toast.warning("Password must be 9 letters, one capital, one special character and one numeric character", options)
            return
        }

        let data = {
            email,
            password
        }

        try {
            let res = await assignAdmin(data);
            return toast.success("Success!", options);
        } catch (error) {
            toast.error("sorry, server error", options)
        } finally {
            EmptyForm();
        }

    }

    function EmptyForm() {
        setEmail("");
        setPassword("");
    }
}