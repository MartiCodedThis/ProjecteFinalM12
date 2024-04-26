import React from 'react';
import { useForm } from 'react-hook-form';

export const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset  } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-5xl font-bold mb-4">Iniciar sessió</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex bg-appfg justify-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                <form className='flex flex-col items-center w-2/3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label>Email</label>
                        <input className='flex w-full'
                        type="text" {...register("email", {
                            required: 'Email obligatori'
                        })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label>Password</label>
                        <input type="password" {...register("password", {
                            required: 'Contrasenya obligatòria'
                        })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className='bg-appbutton text-appwhite w-2/3 rounded-xl shadow-md my-4 px-6 py-2'>Iniciar sessió</button>
                </form>
            </div>
        </>
    )
}