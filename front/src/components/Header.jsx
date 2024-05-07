import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useServicesContext from '../hooks/useServicesContext'

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
            <nav className="flex items-center justify-between flex-wrap *:text-apptext2 bg-appfg shadow-xl px-10 py-2 fixed w-full z-10 top-0">
                <div className="flex items-center flex-shrink-0">
                    <a className="no-underline hover:no-underline" href="/">
                        <img className="object-cover object-center h-16" src="../../static/web/headerlogo.png" alt="TCP Organitza"/>
                    </a>
                </div>
                <div className="block lg:hidden">
                    <button id="nav-toggle" onClick={toggleNav} className="flex items-center px-3 py-2 border rounded text-apptext2 border-apptext2 hover:text-apptext hover:border-apptext">
                        <svg className="fill-apptext2 hover:fill-apptext h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isNavOpen ? '' : 'hidden'} lg:block pt-6 lg:pt-0`} id="nav-content">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center lg:divide-x divide-appsep2">
                        {user ? (
                            <>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-2 px-8" href="/profile">{user}</a>
                                </li>
                                <li>
                                    <button className="inline-block no-underline hover:text-apptext hover:text-underline py-2 px-8" onClick={() => {handleLogout(authToken)}}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-2 px-8" href="/login">Iniciar sessió</a>
                                </li>
                                <li>
                                    <a className="inline-block no-underline hover:text-apptext hover:text-underline py-2 px-8" href="/register">Enregistrar-se</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}