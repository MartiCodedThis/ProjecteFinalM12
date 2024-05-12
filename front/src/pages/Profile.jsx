import React, { useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'
import BrancaSelector from '../components/widgets/BrancaSelector'

export const Profile = () => {
    const { services: { authService, sessionService } } = useServicesContext()
    const [user, setUser] = useState()
    const [unauthorizedUsers, setUnauthorizedUsers] = useState()
    const [authorizedUsers, setAuthorizedUsers] = useState()
    const [refresh, setRefresh] = useState()

    let token = sessionService.getToken()
    useEffect(() => {
        setRefresh(false)
        authService.getUser(token).then((u) => {
            setUser(u.user)
            if (u.role == 1) {
                authService.listUnauthUsers(token).then((e) => {
                    setUnauthorizedUsers(e.userlist)
                })
                authService.listAuthUsers(token).then((e) => {
                    setAuthorizedUsers(e.userlist)
                })
            }
        })
    }, [refresh])

    const handleAuthorize = async (user) => {
        authService.authorize(token, user.id).then(() => {
            setRefresh(true)
        })
    }
    const handleUnauthorize = async (user) => {
        authService.unauthorize(token, user.d).then(() => {
            setRefresh(true)
        })
    }
    return (
        <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Perfil d'usuari</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10'>
                {user ?
                    <>
                        <h3 className='font-bold text-apptext2'>Nom d'usuari</h3><p className='mb-4'>{user.name}</p>
                        <h3 className='font-bold text-apptext2'>Adreça de correu:</h3><p className='mb-4'>{user.email}</p>
                        <h3 className='font-bold text-apptext2'>Branca:</h3><p className='mb-4'>{user.branca >= 0 ? user.branca : <> No tens cap branca assignada </>}</p>
                        <BrancaSelector refresh={setRefresh}></BrancaSelector>
                        {user.carrec ?
                            <p> {user.carrec} </p>
                        : <></>}
                        {user.role_id == 1 ?
                            <>
                                <hr className='border-appsep2 mb-8'></hr>
                                <h3 className="font-bold text-apptext2 mb-4">Opcions d'administrador</h3>
                                <div className='mb-4'>
                                    <h4 className='font-bold text-sm text-apptext2'>Usuaris no autoritzats</h4>
                                    {unauthorizedUsers ?
                                        unauthorizedUsers.map((user) => {
                                            if (user.role_id != 1) {
                                                return (
                                                    <>{user.name}  {user.email}
                                                        <button onClick={() => handleAuthorize(user)}>Autoritzar</button>
                                                        <br />
                                                    </>
                                                )
                                            }
                                        })
                                    : <>
                                        <p>No hi ha usuaris per autoritzar.</p>
                                    </>}
                                </div>
                                <div className='mb-4'>
                                    <h4 className='font-bold text-sm text-apptext2'>Usuaris autoritzats</h4>
                                    {authorizedUsers ?
                                        authorizedUsers.map((user) => {
                                            if (user.role_id != 1) {
                                                return (
                                                    <>{user.name}  {user.email}
                                                        <button onClick={() => handleUnauthorize(user)}>Desautoritzar</button>
                                                        <br />
                                                    </>
                                                )
                                            }
                                        })
                                        : <>
                                            <p>No hi ha usuaris per desautoritzar.</p>
                                        </>}
                                </div>
                            </>
                        : <></>}
                    </>
                : <><p>Carregant...</p></>}
            </div>
        </div>
    )
}
