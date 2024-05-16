import React, { useEffect, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'
import BrancaSelector from '../components/widgets/BrancaSelector'
import CarrecSelector from '../components/widgets/CarrecSelector'
import { getBrancaName, getCarrecName } from '../components/widgets/BadgeShow'

export const Profile = () => {
    const { services: { authService, sessionService } } = useServicesContext()
    const [user, setUser] = useState(null)
    const [unauthorizedUsers, setUnauthorizedUsers] = useState([])
    const [authorizedUsers, setAuthorizedUsers] = useState([])
    const [refresh, setRefresh] = useState(false)

    let token = sessionService.getToken()
    useEffect(() => {
        setRefresh(false)
        authService.getUser(token).then((u) => {
            setUser(u.user)
            if (u.role == 1) {
                authService.listUnauthUsers(token).then((e) => {
                    setUnauthorizedUsers(e.userlist || [])
                })
                authService.listAuthUsers(token).then((e) => {
                    setAuthorizedUsers(e.userlist || [])
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
        authService.unauthorize(token, user.id).then(() => {
            setRefresh(true)
        })
    }

    return (
        <div className="mb-12">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfil d'usuari</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10'>
                {user ?
                    <>
                        <h3 className='font-bold text-apptext2'>Nom d'usuari</h3>
                        <p className='mb-4'>{user.name}</p>
                        <h3 className='font-bold text-apptext2'>Adreça de correu:</h3>
                        <p className='mb-4'>{user.email}</p>
                        <h3 className='font-bold text-apptext2'>Branca:</h3>
                        <div className='mb-4'>
                            {user.branca >= 0 ? getBrancaName(user.branca) : <p>No tens cap branca assignada</p>}
                        </div>
                        <BrancaSelector refresh={setRefresh}></BrancaSelector>
                        <h3 className='font-bold text-apptext2'>Càrrec:</h3>
                        <div className='mb-4'>{user.carrec ? getCarrecName(user.carrec) : <> No tens cap càrrec assignat </>}</div>
                        <CarrecSelector refresh={setRefresh}></CarrecSelector>
                        {user.role_id == 1 ?
                            <>
                                <hr className='border-appsep2 mb-8'></hr>
                                <h3 className="font-bold text-apptext2 mb-4">Opcions d'administrador</h3>
                                <h4 className='font-bold text-sm text-apptext2'>Usuaris no autoritzats</h4>
                                <table className='mb-4 p-1 w-full lg:w-3/4 border-collapse border border-appsep2'>
                                    <thead>
                                        <tr className="border border-appsep2 *:p-1">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Accions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unauthorizedUsers.length > 0 ? (
                                            unauthorizedUsers.map((user) => {
                                                if (user.role_id != 1) {
                                                    return (
                                                        <tr key={user.id} className='border border-appsep2 *:text-center *:p-2'>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td className='flex flex-row justify-center'>
                                                                <button className='flex items-center gap-1 bg-appbutton text-white rounded-xl px-2 py-1 shadow-md font-bold hover:brightness-110 active:brightness-90' onClick={() => handleAuthorize(user)}>Autoritzar</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className='p-2'>No hi ha usuaris per autoritzar.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <h4 className='font-bold text-sm text-apptext2'>Usuaris autoritzats</h4>
                                <table className='mb-4 w-full lg:w-3/4 border-collapse border border-appsep2'>
                                    <thead>
                                        <tr className="border border-appsep2 p-1">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Accions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {authorizedUsers.length > 1 ? (
                                            authorizedUsers.map((user) => {
                                                if (user.role_id != 1) {
                                                    return (
                                                        <tr key={user.id} className='border border-appsep2 *:text-center *:p-2'>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td className='flex flex-row justify-center'>
                                                                <button className='flex items-center gap-1 bg-apperror text-white rounded-xl px-2 py-1 shadow-md font-bold hover:brightness-110 active:brightness-90' onClick={() => handleUnauthorize(user)}>Desautoritzar</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className='p-2'>No hi ha usuaris per desautoritzar.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                            : null}
                    </>
                    : <p>Carregant...</p>}
            </div>
        </div>
    )
}
