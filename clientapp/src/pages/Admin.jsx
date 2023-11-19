import { AssignAdmin } from "../lib/AssignAdmin";
import { ManualTransaction } from "../lib/ManualTransaction";
import { Stats } from "../lib/Stats";
import { UpdateStats } from "../lib/UpdateStats";
import { CompaignsById } from "../lib/CompaignsById";

export default function Admin() {

    let theme = localStorage.getItem("theme");
    let options = {
        theme: theme == "halloween" ? "dark" : "light"
    }

    return (
        <div className="grid place-content-center pt-28 gap-5 pb-20 ">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <Stats/>
            </div>
            <AssignAdmin options={options}/>
            <ManualTransaction options={options}/>
            <UpdateStats options={options}/>
            <CompaignsById options={options}/>
        </div>
    )
}