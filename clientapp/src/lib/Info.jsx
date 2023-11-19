import { Copy } from "./copy"

export const Info = ({id}) => {
    return (
        <>
            <label htmlFor={'my-modal-6' + id} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:fill-white">
                    <title>info</title>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
            </label>

            <input type="checkbox" id={'my-modal-6' + id} className="modal-toggle" />
            <label htmlFor={'my-modal-6' + id} className="modal cursor-pointer">
                <label className="modal-box relative text-info-content" htmlFor="">
                    <h3 className="text-lg font-bold">More info provided by campaigner!</h3>
                    <Copy key={id} title={'CompaignId'} value={id}/>
                </label>
            </label>
        </>
    )
}
