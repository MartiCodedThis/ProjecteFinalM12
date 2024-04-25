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
            <div >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input type="text" {...register("email", {
                            required: 'Email obligatori'
                        })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" {...register("password", {
                            required: 'Contrasenya obligatòria'
                        })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <button type="submit">Iniciar sessió</button>
                </form>
            </div>
        </>
    )
}