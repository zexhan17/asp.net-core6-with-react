import { useEffect, useState } from "react"
import { getMsgs } from "../../services/Admin.service";
import { toast } from "react-toastify";

export default function Message({ options }) {

    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        getMsgs()
            .then((res) => {
                setMsgs(res.data)
            })
            .catch((error) => {
                toast.error("server error", options)
            })
    }, []);

    if (msgs.length == 0) {
        return (
            <div className="grid place-content-center">
                <h1>NO MESSAGES</h1>
            </div>
        )
    }

    return (
        <div className="mt-20 grid place-content-center">
            {msgs.map(e => {
                return (
                    <div key={e.id} tabIndex={0} className="w-80 md:w-[35rem] lg:w-[40rem] collapse collapse-arrow border border-base-400 bg-base-100 rounded-box my-4">
                        <div key={e.id} className="collapse-title text-xl font-medium">
                            {e.user.email}
                        </div>
                        <div className="collapse-content">
                            <p>{e.text}</p>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}