
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'

export const Login = () => {

    const nav = useNavigate()

    const { services: { authService, sessionService, storedSessionService } } = useServicesContext()
    const { setUser, authToken, setAuthToken, remember, setRemember } = useUserContext()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        console.debug(data)
        let token = await authService.login(data)
        if (token) {
            console.log(data.remember)
            let session = data.remember ? storedSessionService : sessionService
            setAuthToken(token)
            session.setToken(token)
            let response = await authService.getUser(token)
            
            setUser(response.user.name)
            session.setUser(response.user.name)
            
            nav("/")
        }
    }

    return (
        <>
            <h2 className="text-5xl font-bold mb-4">Iniciar sessió</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex bg-appfg justify-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                <form className='flex flex-col items-center w-full md:w-2/3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold text-apptext2 mb-1'>E-mail</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("email", {
                                required: 'Adreça d\'e-mail obligatòria',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email invàlid'
                                }
                            })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold text-apptext2 mb-1'>Contrasenya</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="password"  {...register("password", {
                                required: 'Contrasenya obligatòria',
                                minLength: {
                                    value: 8,
                                    message: 'La contrasenya ha de tenir almenys 8 caràcters'
                                }
                            })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <div className='w-full flex-col mb-4'>
                        <input className='w-4 h-4 mr-2'
                            type="checkbox"  {...register("remember")} />
                        <label className='text-sm italic'>Recorda la meva sessió</label>
                    </div>
                    <button type="submit" className='flex items-center gap-1 bg-appbutton text-white rounded-xl shadow-md my-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'><ArrowRightEndOnRectangleIcon className='h-6 w-6'/>Iniciar sessio</button>
                </form>
            </div>
        </>
    )
}