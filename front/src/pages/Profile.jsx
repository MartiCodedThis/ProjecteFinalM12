import React, { useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'

export const Profile = () => {
    const {services: {authService, sessionService}} = useServicesContext()
    const [user, setUser] = useState()
    const [unauthorizedUsers, setUnauthorizedUsers] = useState()
    let token = sessionService.getToken()
    useEffect(()=>{
        authService.getUser(token).then((u)=>{
            setUser(u.user)
            console.log(u)
            if(u.role == 1){
                authService.listUnauthUsers(token).then((e)=>{
                    setUnauthorizedUsers(e.userlist)
                })
            }
        })
    },[])

    const handleClick = (user_id) => {
        // authService.authorize(token, user_id)
    }
  return (
    <div>
        <h2>Profile</h2>
        {unauthorizedUsers ?   
        unauthorizedUsers.map((user)=>{
            return(
                <>{user.name}
                    <button onClick={handleClick(user.id)}> Authorize </button>
                </>
            )
        })     
         : <></>}
    </div>
  )
}
