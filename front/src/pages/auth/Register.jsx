import React from 'react' 
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useServicesContext from '../../hooks/useServicesContext'

export const Register = () => {

    const nav = useNavigate()

    const { services: {authService}} = useServicesContext()

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm() 
    const password = watch("password")  // Watch the password field

    const onSubmit = async (data) => {
        console.debug(data) 
        try {
            authService.register(data).then(()=>{
                nav("/login")
            })
        } catch (error) {
            console.debug(error)
            alert(error)
        }
    } 

    return (
        <>
            <h2 className="text-5xl font-bold mb-4">Register</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex bg-appfg justify-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                <form className='flex flex-col items-center w-2/3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Nom d'usuari</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("name", {
                                required: 'Nom d\'usuari obligatori'
                            })} />
                        {errors.username && <p className="text-apperror">{errors.username.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Email</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("email", {
                                required: 'Email obligatori',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email invàlid'
                                }
                            })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Password</label>
                        <input type="password"
                            className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            name="password" {...register("password", {
                                required: 'Contrasenya obligatòria',
                                minLength: {
                                    value: 8,
                                    message: 'La contrasenya ha de tenir almenys 8 caràcters'
                                }
                            })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Confirm Password</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="password" {...register("confirmPassword", {
                                validate: value => value === password || "Les contrasenyes no coincideixen"
                            })} />
                        {errors.confirmPassword && <p className="text-apperror">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" className='bg-appbutton text-white w-48 rounded-xl shadow-md my-4 px-6 py-3 font-bold'>Enregistrar-se</button>
                </form>
            </div>
        </>
    )
}
