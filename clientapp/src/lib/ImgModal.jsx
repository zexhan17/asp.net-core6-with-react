export function ImgModal({ src, id }) {
    return (
        <>
            <label htmlFor={id + "modal"} className="btn btn-sm">img</label>
            <input type="checkbox" id={id + "modal"} className="modal-toggle" />
            <label htmlFor={id + "modal"} className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <img src={src} />
                </label>
            </label>
        </>
    )
}