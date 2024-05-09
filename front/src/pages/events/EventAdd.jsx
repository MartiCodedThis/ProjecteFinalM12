import React from 'react'
import { useForm } from 'react-hook-form'
import useServicesContext from '../../hooks/useServicesContext'


export const EventAdd = ({ closePopup }) => {
    const { services: { sessionService, eventService } } = useServicesContext()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    let token = sessionService.getToken()
    const onSubmit = async (data) => {
        eventService.create(token, data)
        reset()
        closePopup()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10 mt-20 sm:mt-32 *:text-apptext2'>
                <div className='flex w-full flex-row justify-end h-0'>
                    <button onClick={closePopup} className="relative bottom-3 left-3 md:bottom-10 md:left-10 block z-30 text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Nom</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("name", {
                                required: 'L\'esdeveniment ha de tindre nom',
                            })} />
                        {errors.name && <p className="text-apperror">{errors.name.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Descripció</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("description", {
                                required: 'L\'esdeveniment ha de tindre descripcio',
                            })} />
                        {errors.description && <p className="text-apperror">{errors.description.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Visibilitat</label>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="0" />
                                Només els responsables veuran les tasques
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="1" />
                                Tothom podrà veure les tasques
                            </label>
                        </div>
                        {errors.visibility && <p className="text-apperror">{errors.visibility.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Data</label>
                        <input type="date" {...register("date", { required: 'Has de seleccionar una data!' })} />
                        {errors.date && <p className="text-apperror">{errors.date.message}</p>}
                    </div>

                    <button type="submit" className='bg-appbutton text-white w-48 rounded-xl shadow-md my-4 px-6 py-3 font-bold'>Crea l'esdeveniment</button>
                </form>
            </div>
        </div>
    )
}
