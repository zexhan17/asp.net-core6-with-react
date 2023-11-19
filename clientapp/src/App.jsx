import { Header } from "./lib/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Funded from "./pages/Funded";
import NonFunded from "./pages/NonFunded";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import CreateCompaign from "./pages/CreateCompaign";
import Admin from "./pages/Admin";
import { AdminHeader } from "./pages/admin/AdminHeader";
import Auth from "./Gaurds/Auth";
import AdminGaurd from "./Gaurds/AdminGaurd";
import LoginGaurd from "./Gaurds/LoginGaurd";
import Transactions from "./pages/admin/Transactions";
import Donors from "./pages/admin/Donors";
import Compaigners from "./pages/admin/Compaigners";
import Requests from "./pages/admin/Requests";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Contact } from "./pages/Contact";
import { VerifyToken } from "./services/Auth.service";
import Message from "./pages/admin/Message";
import Notifications from "./pages/Notifications";

function App() {

  let theme = localStorage.getItem("theme");
  document.querySelector('html').setAttribute('data-theme', theme);
  let options = {
    theme: theme == "halloween" ? "dark" : "light"
  }

  const [auth, setAuth] = useState();
  const [role, setRole] = useState("");
  const [admin, setAdmin] = useState(role == "admin" ? true : false);

  useEffect(() => {
    verify();
  }, [auth]);


  axios.interceptors.request.use((req) => {
    if (req.headers) {
      if (localStorage.getItem('AuthToken') && localStorage.getItem('AuthToken') !== "") {
        let AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
        req.headers.Authorization = `Bearer ${AuthToken}`;
      }
      return req;
    }
    return req;
  }, function (error) {
    return Promise.reject(error);
  });

  return (
    <Router>
      {admin &&
        <AdminHeader auth={auth} options={options} logout={logout} login={login} />
      }
      {!admin &&
        <Header auth={auth} logout={logout} login={login} options={options} />
      }
      <div className="container mx-auto">
        <Routes>
          <Route path='/' element={<Auth auth={auth} admin={admin}><Home /></Auth>} />
          <Route path='/compaigns/funded' element={<Funded role={role} auth={auth} options={options} />} />
          <Route path='/compaigns/nonfunded' element={<NonFunded role={role} auth={auth} options={options} />} />
          <Route path='/compaigns/new' element={<Auth auth={auth} admin={admin}>  <CreateCompaign role={role} options={options} /> </Auth>} />
          <Route path='/profile' element={<Auth auth={auth} admin={admin}>  <Profile role={role} options={options} /> </Auth>} />
          <Route path='/contact' element={<Auth auth={auth} admin={admin}> <Contact options={options} /> </Auth>} />
          <Route path='/notifications' element={<Auth auth={auth} admin={admin}> <Notifications options={options} /> </Auth>} />
          <Route path='/admin' element={<AdminGaurd auth={auth} admin={admin}> <Admin /> </AdminGaurd>} />
          <Route path='/donors' element={<AdminGaurd auth={auth} admin={admin}> <Donors options={options} /> </AdminGaurd>} />
          <Route path='/compaigners' element={<AdminGaurd auth={auth} admin={admin}> <Compaigners options={options} /> </AdminGaurd>} />
          <Route path='/transactions' element={<AdminGaurd auth={auth} admin={admin}> <Transactions options={options} /> </AdminGaurd>} />
          <Route path='/requests' element={<AdminGaurd auth={auth} admin={admin}> <Requests options={options} /> </AdminGaurd>} />
          <Route path='/messages' element={<AdminGaurd auth={auth} admin={admin}> <Message options={options} /> </AdminGaurd>} />
          <Route path='/login' element={<LoginGaurd auth={auth} admin={admin}> <Login login={login} options={options} /> </LoginGaurd>} />
          <Route path='/signup' element={<LoginGaurd auth={auth} admin={admin}> <Signup options={options} /> </LoginGaurd>} />
        </Routes>
      </div>
    </Router>
  )

  function verify() {
    VerifyToken()
      .then((res) => {
        setAuth(true);
        setrole();
      })
      .catch(() => {
        logout();
      })
  }

  function setrole() {
    let user = JSON.parse(localStorage.getItem("User"));
    setRole(user.role);
    if (user.role == "admin")
      setAdmin(true);
  }

  function logout() {
    localStorage.removeItem("User");
    localStorage.removeItem("AuthToken");
    setAuth(false)
  }

  function login() {
    setAuth(true)
  }
}

export default App
