import React from 'react';
import { useForm } from 'react-hook-form';

export const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-5xl font-bold mb-4">Iniciar sessió</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex bg-appfg justify-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                <form className='flex flex-col items-center w-full md:w-2/3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>E-mail</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner'
                            type="text" {...register("email", {
                                required: 'Adreça d\'e-mail obligatòria'
                            })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Contrasenya</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner'
                            type="password"  {...register("password", {
                                required: 'Contrasenya obligatòria'
                            })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <div className='w-full flex-col mb-4'>
                        <input className='w-4 h-4 mr-1 shadow-inner'
                            type="checkbox"  {...register("remember")} />
                        <label>Recorda la meva sessió</label>
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className='bg-appbutton text-appwhite w-48 rounded-xl shadow-md my-4 px-6 py-3 font-bold'>Iniciar sessió</button>
                </form>
            </div>
        </>
    )
}