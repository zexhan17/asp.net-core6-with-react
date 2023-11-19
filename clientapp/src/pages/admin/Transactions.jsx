import { toast } from 'react-toastify';
import { GetAllTransactions, changeTransactionStatus } from '../../services/Admin.service'
import { useState, useEffect } from 'react';

export default function Transactions({options}) {

    const [fetchData, setFetchData] = useState([])
    const [transactions, setTransactions] = useState([]);

    useEffect( () => {
        GetAllTransactions()
        .then((res)=>{
            setFetchData(res.data)
            setTransactions(res.data);
        })
        .catch((error)=>{
            toast.error(error.response.data, options);
        }) 
    }, [])

    function filterTable(value) {
        if (value != '') setTransactions(fetchData.filter(f => f.donorId.includes(value) || f.compaignId.includes(value) || f.compaignerId.includes(value) || f.tid.includes(value) ))
        if (value == '') setTransactions(fetchData);
    }

    return (
        <div className="pt-24 pb-10 grid place-content-center">
            <div className='md:flex justify-between mb-3 md:mb-0'>
                <div className="flex md:mb-5 mb-2 items-center">
                    <label className="label">
                        <span className="label-text">Search By ID</span>
                    </label>
                    <input type="search" onChange={(e) => filterTable(e.target.value)} className="input input-bordered h-8 ml-3" />
                </div>
                <span className='md:mt-1'>Total Transactions <span className='badge badge-primary'>{transactions.length}</span></span>
            </div>
            <table className="w-[26rem] md:w-full">
                <thead>
                    <tr className="bg-base-300">
                        <th className="p-3 pl-2 text-left">Donor Id</th>
                        <th className="p-3 pl-2 text-left">Transaction Id</th>
                        <th className="p-3 pl-2 text-left">Amount</th>
                        <th className="p-3 pl-2 text-left">Compaigner Id</th>
                        <th className="p-3 pl-2 text-left">Compaign Id</th>
                        <th className="p-3 pl-2 text-left">Date M/D/Y</th>
                        <th className="p-3 pl-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => {
                        return (
                            <tr key={t.id} className="even:bg-base-300 odd:bg-base-200">
                                <td className="p-2 text-left " data-cell="donor Id">{t.donorId}</td>
                                <td className="p-2 text-left " data-cell="donor Id">{t.tid}</td>
                                <td className="p-2 text-left " data-cell="Amount">{t.amount}</td>
                                <td className="p-2 text-left " data-cell="compaigner Id">{t.compaignerId}</td>
                                <td className="p-2 text-left " data-cell="Compaign Id">{t.compaignId}</td>
                                <td className="p-2 text-left " data-cell="Transfer Date">{convertToOnlyDate(t.date)}</td>
                                <td onClick={() => action(t.id)} className={`p-2 text-left cursor-pointer ${t.status == "not verify" ? 'bg-warning' : (t.status == "pending receivings" ? 'bg-info' : 'bg-success')}`} data-cell="Transfer Date">{t.status} {t.reqOnlineTransfer == true ? '(Asked for online transfer)' : ''}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

    function convertToOnlyDate(isoString) {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options);
      }

    function action(id){
        const index = transactions.findIndex(t => t.id == id);
        if(transactions[index].status == "success"){ return }  

        changeTransactionStatus(id)
            .then((res)=>{
                const index = transactions.findIndex(t => t.id == res.data.id);
                let newList = transactions.slice();
                newList[index].status = res.data.status;
                setTransactions(newList);
            })
            .catch((error)=>{
                console.log(error)
                toast.error(error.response.data, options)
            })
    }
}