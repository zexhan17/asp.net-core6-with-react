import { useState } from "react"
import { SaveTransaction } from "../services/Transaction.service"
import { Copy } from "./copy"
import { toast } from "react-toastify";

export const Donate = ({ id, options, authorId }) => {

    const [tid, setTid] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <>
            <label htmlFor={"modal" + id} className="btn btn-sm md:btn-md btn-outline">Support</label>

            <input type="checkbox" id={"modal" + id} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-info-content">
                    <h3 className="font-bold text-lg mb-3">Support the compaigner😇</h3>
                    <span>Transfer amount in this account</span>
                    <div className="border px-2 rounded mt-1">
                        <span>Name: Muhmmad Zeeshan</span>
                        <Copy title={"JazzCash Mobile Account"} value={"03096035017"} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Transaction Id</span>
                        </label>
                        <input type="text" className="input input-bordered w-full" value={tid} onChange={(e) => setTid(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Amount you sent</span>
                        </label>
                        <input type="text" className="input input-bordered w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        <label className={`btn btn-secondary ${loading ? 'loading' : ''}`} onClick={submit}>submite</label>
                        <label htmlFor={"modal" + id} className="btn">close</label>
                    </div>
                </div>
            </div>
        </>
    )

    function submit(){
        if(amount == "" || tid == ""){
            toast.warning("Fields are empty!", options)
            return;
        }
        setLoading(true);

        let user = JSON.parse(localStorage.getItem("User"));

        const data = {
            compaignId: id,
            compaignerId: authorId,
            donorId: user.id,
            amount,
            tid,
        }

        SaveTransaction(data)
            .then((res) => {
                toast.success("Thanks for supporting ✨");
                setAmount("")
                setTid("")
            })
            .catch((error) => {
                toast.error(error.response.data, options)
            })

        setLoading(false);

    }
}