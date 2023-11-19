import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { checkNotifications } from '../services/User.service';

export const Header = ({ auth, logout, login }) => {

    const [notify, setNotify] = useState(false);
    const theme = localStorage.getItem("theme") === "emerald" ? true : false;
    function toggleTheme(event) {
        if (event.target.checked) {
            localStorage.setItem("theme", "emerald");
            document.querySelector('html').setAttribute('data-theme', "emerald");
        }
        else {
            localStorage.setItem("theme", "halloween");
            document.querySelector('html').setAttribute('data-theme', "halloween");
        }
    }

    useEffect(() => {
        checkNotifications()
            .then((res)=>{
                if(res.data > 0){
                    setNotify(true);
                }
            })
    }, [])

    return (
        <div className="navbar bg-base-100 shadow-lg top-0 fixed z-10">
            <div className="navbar-start">
                <div className="dropdown md:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-lg w-52 border">
                        {auth &&
                            <>
                                <li> <NavLink to='/'>Home</NavLink> </li>
                                <li> <NavLink to='/profile'>Profile</NavLink> </li>
                                <li> <NavLink to='/contact'>Contact Us</NavLink> </li>
                            </>
                        }
                        <li className="menu-title">
                            <span>Compaigns</span>
                        </li>
                        <li> <NavLink to='compaigns/funded'>Funded </NavLink> </li>
                        <li> <NavLink to='compaigns/nonfunded'>Non Funded </NavLink> </li>
                    </ul>
                </div>
                <div className='flex items-center cursor-pointer'>
                    <img src="/img/logo.svg" alt='logo' className="h-12 w-12 " />
                    <NavLink to="/" className="btn btn-ghost normal-case text-xl hover:text-white">
                        <span className='text-green-500 contents'>GROW</span>HUB
                    </NavLink>
                </div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {auth &&
                        <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                        </>
                    }
                    <li tabIndex={0}>
                        <a>
                            Compaigns
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </a>
                        <ul className="p-2 bg-base-100">
                            <li> <NavLink to='compaigns/funded'>Funded</NavLink> </li>
                            <li> <NavLink to='compaigns/nonfunded'>Non Funded</NavLink> </li>
                        </ul>
                    </li>
                    {auth &&
                        <li> <NavLink to='/contact'>Contact Us</NavLink> </li>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {auth &&
                    <NavLink to='/notifications'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer ${notify ? 'fill-info' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>
                    </NavLink>
                }
                {/* theme toggler */}
                <label className="swap swap-rotate mx-3">
                    <input type="checkbox" defaultChecked={theme} title='Toggle Theme' onClick={event => toggleTheme(event)} />
                    <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                    <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                </label>
                {/* logout */}
                {auth &&
                    <svg onClick={logout} title="logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="w-6 h-6 hover:fill-red-500 cursor-pointer mr-2">
                        <title>Log Out</title>
                        <path fillRule="evenodd"
                            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                            clipRule="evenodd" />
                    </svg>
                }
                {!auth &&
                    <NavLink to="/login" className="btn btn-outline btn-sm rounded">Join</NavLink>
                }
            </div>
        </div>
    )
}

