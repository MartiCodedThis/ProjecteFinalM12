import { createContext, useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext';

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const { services: {storedSessionService, sessionService}} = useServicesContext()
  const [authToken, setAuthToken] = useState("")
  const [user, setUser] = useState("")
  const [remember, setRemember] = useState(null)

  let sessionToken = sessionService.getToken()
  let localToken = storedSessionService.getToken()
  let userValue
  let tokenValue
  useEffect(() => {
    if(localToken){
      let localUser = storedSessionService.getUser()
      userValue = localUser
      tokenValue = localToken
      setRemember(true)
    }
    else if(sessionToken){
      let sessionUser = sessionService.getUser()
      userValue = sessionUser
      tokenValue = sessionToken
      setRemember(false)
    }
    else{
      console.debug("User not stored")
    }
    setUser(userValue)
    setAuthToken(tokenValue)
  }, [] )

  return (
    <UserContext.Provider value={{ authToken, setAuthToken, user, setUser, remember, setRemember }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext