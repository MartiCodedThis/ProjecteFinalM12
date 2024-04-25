import React from 'react';
import { useForm } from 'react-hook-form';

export const Register = () => {

    const { register, handleSubmit, formState: { errors }, reset, watch  } = useForm();

    const password = watch("password"); // Watch the password field

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-5xl font-bold mb-4">Register</h2>
            <hr className="border-appsep mb-4"></hr>
            <div >
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                        <label>Nom d'usuari</label>
                        <input type="text" {...register("username",{
                            required: 'Nom d\'usuari obligatori'
                        })} />
                        {errors.username && <p className="text-apperror">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" {...register("email", {
                            required: 'Email obligatori',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email invàlid'
                            }
                        })} />
                        {errors.email && <p className="text-apperror">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" {...register("password", {
                            required: 'Contrasenya obligatòria',
                            minLength: {
                                value: 8,
                                message: 'La contrasenya ha de tenir almenys 8 caràcters'
                            }
                        })} />
                        {errors.password && <p className="text-apperror">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" {...register("confirmPassword", {
                            validate: value => value === password || "Les contrasenyes no coincideixen"
                        })} />
                        {errors.confirmPassword && <p className="text-apperror">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
