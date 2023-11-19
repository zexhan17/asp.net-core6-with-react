import { Navigate } from "react-router-dom"

export default function Auth({children, auth, admin}){
    if(auth && !admin){
        return children
    }
    else if(auth && admin){
        return <Navigate to='/admin' />
    }
    else{
        return <Navigate to='/login' />
    }
}