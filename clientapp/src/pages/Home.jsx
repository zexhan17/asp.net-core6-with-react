import { Stats } from "../lib/Stats";

export default function Home() {
    return (
        <>
            <div className="grid place-items-center min-h-screen mt-20 md:mt-0 mb-10 md:mb-0">
                <div className="md:flex max-w-[50rem] items-center mx-5 gap-5">
                    <div className="stats stats-vertical shadow w-full mb-5 bg-base-200 md:mb-0 ">
                        <Stats/>
                    </div>
                    <div>
                        <h1 className="text-4xl md:5xl font-bold ">About Us</h1>
                        <p className="py-6">GROW HUB will help bridge this gap by providing a way for people to seek support from a larger pool of potential donors. Users should be able to create a campaign  and  describe the purpose of the campaign and the intended use of the funds. It should be able to process payments securely and efficiently.</p>
                        {/* The button to open modal */}
                        <label htmlFor="my-modal-6" className="btn btn-primary">Donate us</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">We are thankfull to you!</h3>
                                <p className="py-4">This money is instantly available to any compaigner if there is no donor available on the spot for helping</p>
                                <span>Our JaazCash Account</span>
                                <div className="flex items-center justify-between bg-primary-content px-2 rounded text-white">
                                    <span>GrowHub</span>
                                    <span>0303 3303303</span>
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="my-modal-6" className="btn btn-primary">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}