import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useServicesContext from '../hooks/useServicesContext'

import { Bars3Icon } from '@heroicons/react/24/outline'

export const Header = () => {
    const nav = useNavigate()

    const [isNavOpen, setIsNavOpen] = useState(false)

    const { services: { authService, sessionService, storedSessionService } } = useServicesContext()
    const { user, setUser, authToken, remember } = useUserContext()

    let session =  remember ? storedSessionService : sessionService
    
    const handleLogout = () => {
        let logout = authService.logout(authToken)
        if (logout) {
            session.clearToken()
            session.clearUser()
            setUser(null)
            nav("/login")
        }
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap *:text-apptext2 bg-appfg shadow-xl px-10 py-2 fixed w-full z-30 top-0">
                <div className="flex items-center flex-shrink-0">
                    <a className="no-underline hover:no-underline" href="/">
                        <img className="object-cover object-center h-12 sm:h-16 hover:brightness-50" src="../../static/web/headerlogo.png" alt="TCP Organitza"/>
                    </a>
                </div>
                <div className="block sm:hidden">
                    <button id="nav-toggle" onClick={toggleNav} className="flex items-center text-apptext2 border-apptext2 hover:text-apptext hover:border-apptext">
                        <Bars3Icon className="fill-apptext2 hover:fill-apptext h-7 w-7" /><title>Menu</title>
                    </button>
                </div>
                <div className={`w-full flex-grow sm:flex sm:items-center sm:w-auto ${isNavOpen ? '' : 'hidden'} sm:block sm:pt-0`} id="nav-content">
                    <hr className='border-appsep2 my-2 sm:hidden'></hr>
                    <ul className="list-reset sm:flex justify-end flex-1 items-center sm:divide-x divide-appsep2">
                        {user ? (
                            <>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-1 px-8" href="/profile">{user.name}</a>
                                </li>
                                <li>
                                    <button className="inline-block no-underline hover:text-apptext hover:text-underline py-1 px-8" onClick={() => {handleLogout(authToken)}}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-1 px-8" href="/login">Iniciar sessió</a>
                                </li>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-1 px-8" href="/register">Enregistrar-se</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}