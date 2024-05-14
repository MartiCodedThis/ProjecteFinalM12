import React, { useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'
import BrancaSelector from '../components/widgets/BrancaSelector'
import CarrecSelector from '../components/widgets/CarrecSelector'

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

    function getBrancaName(brancaValue) {
        switch(brancaValue) {
            case 0:
                return <button className='block min-w-32 my-4 rounded-xl shadow-md px-4 py-2 font-bold bg-follets text-apptext'>Follets</button>
            case 1:
                return <button className='min-w-32 my-4 rounded-xl shadow-md px-4 py-2 font-bold bg-llobatons text-white'>Llobatons</button>
            case 2:
                return <button className='min-w-32 my-4 rounded-xl shadow-md px-4 py-2 font-bold bg-puputs text-white'>Puputs</button>
            case 3:
                return <button className='min-w-32 my-4 rounded-xl shadow-md px-4 py-2 font-bold bg-rangers text-apptext'>Ràngers</button>
            default:
                return <button className='min-w-32 my-4 rounded-xl shadow-md px-4 py-2 font-bold bg-apperror text-white'>???</button>
        }
    }
    

    return (
        <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Perfil d'usuari</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10'>
                {user ?
                    <>
                        <h3 className='font-bold text-apptext2'>Nom d'usuari</h3>
                        <p className='mb-4'>{user.name}</p>
                        <h3 className='font-bold text-apptext2'>Adreça de correu:</h3>
                        <p className='mb-4'>{user.email}</p>
                        <h3 className='font-bold text-apptext2'>Branca:</h3>
                        <div>
                            {user.branca >= 0 ? getBrancaName(user.branca) : <p>No tens cap branca assignada</p>}
                        </div>
                        <BrancaSelector refresh={setRefresh}></BrancaSelector>
                        <h3 className='font-bold text-apptext2'>Carrec:</h3><p className='mb-4'>{user.carrec >= 0 ? user.carrec : <> No tens cap carrec assignat </>}</p>
                        <CarrecSelector refresh={setRefresh}></CarrecSelector>
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
