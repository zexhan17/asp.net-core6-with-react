import { useState } from "react";

export default function Users(){
    
    const [users, setUsers] = useState([
        {
          id: 0,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 1,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 2,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 3,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 4,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 5,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 6,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 7,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 8,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 9,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 10,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 11,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
        {
          id: 12,
          name: 'Test1',
          msg: 'Hi, there im using this chat application Hi, there im using this chat application'
        },
      ]
    );
    const [newUserId, setNewUserId] = useState('');

    function addUser() {
        if( newUserId == '') return
        setUsers([{
          id: 13,
          name: 'Test5',
          msg: 'Hi,'
        }, ...users])
        setNewUserId('')
      }

    return(
        <div className='col-span-1 overflow-auto scroll mx-5 md:mx-0'>
        {/* Add New User Input */}
        <div className='absolute z-10'>
          <div className=''>
            <input type="text" placeholder="Search..." value={newUserId} onChange={e => setNewUserId(e.target.value)} className="input input-bordered w-[19rem] h-10 ml-1 text-xs" />
          </div>
          {/* <svg onClick={addUser} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
            <title>New Chat</title>
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
          </svg> */}
        </div>
        {/* contacts list */}
        <ul className='mt-12'>
          {users.map((i, index) => {
            return (
              <li key={index} className="flex hover:bg-primary-content items-center hover:text-white py-2 pl-2 cursor-pointer rounded-lg">
                <div className="avatar shadow-lg">
                  <div className="h-12 rounded">
                    <img src="img/profile.jpg" />
                  </div>
                </div>
                <div className='ml-3'>
                  <p>{i.name}</p>
                  <p className='truncate'>{i.msg}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
}