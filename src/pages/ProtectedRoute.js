import { useAppContext } from "../context/appContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
 
    const {user} = useAppContext()
    console.log(user)
    if(!user) {
        return <Navigate to = "/landing"></Navigate>
    }

  return (
      <div>{children}</div>
  )

  
}

export default ProtectedRoute