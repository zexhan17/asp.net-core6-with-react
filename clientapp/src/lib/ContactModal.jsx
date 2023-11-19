import { Copy } from "./copy"

export const ContactModal = ({ id, author, email }) => {
    return (
        <>
            <label htmlFor={"Contactmodal" + id} className="btn btn-sm md:btn-md">Contact</label>

            <input type="checkbox" id={"Contactmodal" + id} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h1 className="my-3 bg-warning p-2 rounded-md">You can contact to <b>{author}</b> using this email, please use this for good intent only, you are accountable for any missuse</h1>
                    <div className="border px-2 rounded">
                        <Copy title={"Email"} value={email} />
                    </div>
                    <div className="modal-action">
                        <label htmlFor={"Contactmodal" + id} className="btn">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}