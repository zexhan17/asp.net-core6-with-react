import { useState } from "react";

export const Collapse = ({children, text}) => {
    // ui states
    const [show, setShow] = useState(false);
    // ui states

    return (
        <div className="border border-base-300 bg-base-100 rounded-box w-80 md:w-[35rem] lg:w-[40rem]">
            <div className="collapse-title text-xl items-center font-medium flex justify-between pr-3 cursor-pointer" onClick={() => setShow(!show)} >
                <span>{text}</span>
                {!show && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>}
                {show && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
                }
            </div>
            {show &&
                <div className="p-4 space-y-3">
                    {children}
                </div>
            }
        </div>
    )
}