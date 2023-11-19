import { useEffect, useState } from "react";
import { Compaign } from "../lib/Compaign";
import { NavLink } from "react-router-dom";
import { FundedCompaigns } from '../services/Compaign.service'
import { toast } from "react-toastify";

const Funded = ({ auth, role, options }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    FundedCompaigns()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data, options);
      })

  }, []);


  return (
    <>
      <div className="pt-20 mx-auto w-80 md:w-[35rem] lg:w-[40rem] pl-1 flex items-center justify-between">
        {data.length == 0 &&
          <h1 className="font-bold md:text-2xl block uppercase">No compaigns</h1>
        }
        {data.length > 0 &&
          <h1 className="font-bold md:text-2xl text-1xll block uppercase">raise funds</h1>
        }
        {auth && role == 'comp' &&
          <NavLink to="/compaigns/new" className="btn btn-primary btn-sm text-xs md:btn-md md:text-md">Make New Compaign</NavLink>
        }
      </div>
      {data.map(e => {
        return (
          <div key={e.id}>
            {e.funded &&
              <Compaign compaign={e} role={role} auth={auth} />
            }
          </div>
        )
      })}
    </>
  )
}

export default Funded