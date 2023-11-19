import { useEffect, useState } from "react"
import { getNotifications } from "../services/User.service"
import { toast } from "react-toastify"
import { transferOnline } from "../services/Transaction.service";

export default function Notifications({ options }) {

    const [list, setList] = useState([]);

    useEffect(() => {
        getNotifications()
            .then((res) => {
                setList(res.data)
            })
            .catch((err) => {
                toast.error("server error", options)
            })
    }, [])

    return (
        <div className="mt-20 grid place-content-center gap-4 text-center mx-5">
            <h1 className="outline md:text-xl font-bold p-2 rounded-lg">You can ask for online transfer in your account you added when you created your profile, or visit the office for cash</h1>
            {list.map(e => {
                return (
                    <div className="alert alert-info">
                        <span>You have <b>{e.transaction.amount}</b> rupees funds, against compaign <b>{e.title}</b></span>
                        <span className="badge cursor-pointer" onClick={() => transfer(e.transaction.id)}>Transfer Online</span>
                    </div>
                )
            })}
        </div>
    )

    function transfer(id) {
        transferOnline(id)
            .then(() => {
                getNotifications()
                    .then((res) => {
                        setList(res.data)
                    })
                    .catch((err) => {
                        toast.error("server error", options)
                    })
            })
            .catch((error) => {
                toast.error(error.response.data, options)
            })
    }
}