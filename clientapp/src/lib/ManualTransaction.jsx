import { useState } from "react";
import { Collapse } from "./Collapse";
import { toast } from "react-toastify";
import { makeManualTransaction } from "../services/Admin.service";

export const ManualTransaction = ({ options }) => {

    const [donorId, setDonorId] = useState("");
    const [compaignerId, setCompaignerId] = useState("");
    const [amount, setAmount] = useState("");
    const [compaignId, setCompaignId] = useState("");
    const [tid, settid] = useState("");
    const [loading, setLoading] = useState("");

    return (
        <Collapse text="Make Transaction Record">
            <input type="text" value={donorId} onChange={(e) => setDonorId(e.target.value)} placeholder="Enter Donor Id" className="input input-bordered  block w-full" />
            <input type="text" value={compaignerId} onChange={(e) => setCompaignerId(e.target.value)} placeholder="Enter Compaigner Id" className="input input-bordered  block w-full" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" className="input input-bordered  block w-full" />
            <input type="text" value={compaignId} onChange={(e) => setCompaignId(e.target.value)} placeholder="Enter Compaign Id" className="input input-bordered  block w-full" />
            <input type="text" value={tid} onChange={(e) => settid(e.target.value)} placeholder="Enter Transaction Id" className="input input-bordered  block w-full" />
            <button className="btn btn-primary mt-5 mb-3" disabled={loading} onClick={MakeTransaction}>Add Record</button>
        </Collapse>
    )

    function MakeTransaction() {
        setLoading(true);
        if (donorId == "" && compaignId == "" && compaignerId == "" && amount == "") {
            toast.warning("Fields are empty", options);
            setLoading(false);
            return;
        }
        let data = {
            compaignId,
            compaignerId,
            donorId,
            amount,
            tid
        }
        makeManualTransaction(data)
            .then((res) => {
                setDefaultValues();
                toast.success("Successfully make transactoin record 💸", options)
            })
            .catch((error) => {
                toast.error(error.response.data, options)
            })

        setLoading(false);
    }

    function setDefaultValues() {
        setAmount("");
        setCompaignId("");
        setCompaignerId("");
        setDonorId("");
        settid("");
    }
}