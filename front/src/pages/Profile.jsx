import React, { useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'
import BrancaSelector from '../components/widgets/BrancaSelector'

export const Profile = () => {
    const {services: {authService, sessionService}} = useServicesContext()
    const [user, setUser] = useState()
    const [unauthorizedUsers, setUnauthorizedUsers] = useState()
    const [authorizedUsers, setAuthorizedUsers] = useState()
    const [refresh, setRefresh] = useState()

    let token = sessionService.getToken()
    useEffect(()=>{
        setRefresh(false)
        authService.getUser(token).then((u)=>{
            setUser(u.user)
            if(u.role == 1){
                authService.listUnauthUsers(token).then((e)=>{
                    setUnauthorizedUsers(e.userlist)
                })
                authService.listAuthUsers(token).then((e)=>{
                    setAuthorizedUsers(e.userlist)
                })
            }
        })
    },[refresh])

    const handleAuthorize = async (user) => {
        authService.authorize(token, user.id).then(()=>{
            setRefresh(true)
        })
    }
    const handleUnauthorize = async (user) => {
        authService.unauthorize(token, user.d).then(()=>{
            setRefresh(true)
        })
    }
  return (
    <div>
        {user ? 
        <>
            <h2> {user.name} </h2>
            <p> {user.email} </p>
            <p> Branca: {user.branca >= 0 ? user.branca : <> No tens cap branca assignada </>}</p>
            <BrancaSelector refresh={setRefresh}></BrancaSelector>
                
            {user.carrec ? 
            <p> {user.carrec} </p>
            : <></>}
            {user.role_id == 1 ? 
            <div>
                <div>
                    <h2>Authorize Users</h2>
                    {unauthorizedUsers ?   
                    unauthorizedUsers.map((user)=>{
                        if(user.role_id != 1){
                            return(
                                <>{user.name}  {user.email}
                                    <button onClick={()=>handleAuthorize(user)}> Authorize </button>
                                    <br />
                                </>
                            )
                        }
                    })     
                    : <></>}

                </div>
                <div>
                    <h2>Unauthorize Users</h2>
                    {authorizedUsers ?   
                    authorizedUsers.map((user)=>{
                        if(user.role_id != 1){
                            return(
                                <>{user.name}  {user.email}
                                    <button onClick={()=>handleUnauthorize(user)}> Unauthorize </button>
                                    <br />
                                </>
                            )
                        }
                    })     
                    : <></>}
                </div>
            </div>
            : <></> }
        </>
        : <>Carregant ...</>}
        
    </div>
  )
}
