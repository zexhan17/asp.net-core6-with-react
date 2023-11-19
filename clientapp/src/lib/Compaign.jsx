import { Info } from "./Info"
import { Donate } from "./Donate";
import { ContactModal } from "./ContactModal";
import { toast } from "react-toastify"
import { markCompleted } from "../services/Compaign.service";

export const Compaign = ({ compaign, role, owner = false, auth, options }) => {

  // const { id, title, description, funded, author, authorId, requiredMoney, donatedMoney, completed, authorEmail } = compaign;
  const { id, title, description, funded, authorId, requiredMoney, donatedMoney, completed, user } = compaign;
  const { email, name } = user
  return (
    <div className="card mx-auto w-80 md:w-[35rem] lg:w-[40rem] bg-primary text-primary-content my-5">
      <div className="card-body">
        <div className="flex items-end justify-between">
          <div className="">
            <h2 className="card-title capitalize mb-[-5px]">{title}</h2>
            <small>@{name}</small>
          </div>
          {role == "admin" &&
            <Info id={id} />
          }
        </div>
        <p>{description}</p>
        {funded &&
          <>
            <div className="flex justify-between my-2 gap-5">
              <span className="black_border px-2 rounded-full">Needed: {requiredMoney}</span>
              <span className="px-2 rounded-full black_border hidden md:flex">Remaining: {requiredMoney - donatedMoney}</span>
              <span className="px-2 rounded-full black_border">Collected: {donatedMoney}</span>
            </div>
          </>
        }
        {auth &&
          <div className="card-actions justify-end mt-1">
            {owner && completed == false &&
              <button className="btn btn-sm md:btn-md" onClick={mark}>Mark as Completed</button>
            }
            {!owner &&
              <>
                {completed == false &&
                  <>
                    {funded &&
                      <Donate id={id} authorId={authorId} options={options} />
                    }
                    <ContactModal id={id} author={name} email={email} />
                  </>
                }
              </>
            }
            {completed == true &&
              <button className="btn btn-disabled btn-sm md:btn-md">Completed</button>
            }
          </div>
        }

      </div>
    </div>
  )

  function mark() {
    markCompleted(id)
      .then((res) => {
        toast.success("Success", options)
      })
      .catch((error) => {
        toast.error(error.response.data, options)
      })
  }

}