import React from 'react'
import { useForm } from 'react-hook-form'
import useServicesContext from '../../hooks/useServicesContext'
import { XCircleIcon } from '@heroicons/react/24/outline'

export const TaskAdd = ({ event_id, closePopup }) => {
    const { services: { sessionService, taskService } } = useServicesContext()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    let token = sessionService.getToken()
    const onSubmit = async (data) => {
        taskService.create(token, data)
        reset()
        closePopup()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className='flex flex-col md:w-3/4 xl:w-2/3 bg-appfg justify-center rounded-2xl shadow-xl p-8 my-8 sm:my-16 mx-0 lg:mx-10 mt-20 sm:mt-32 h-1/2*:text-apptext2'>
                <div className='flex w-full flex-row justify-end h-0'>
                    <button onClick={closePopup} className="relative bottom-5 left-5 block z-30 text-gray-500 hover:text-gray-800">
                        <XCircleIcon className="size-6" />
                    </button>
                </div>
                <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Nom</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("name", {
                                required: 'La tasca necessita nom',
                            })} />
                        {errors.name && <p className="text-apperror">{errors.name.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Descripció</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("description", {
                                required: 'Especifica que s\'ha de fer',
                            })} />
                        {errors.description && <p className="text-apperror">{errors.description.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Visibilitat</label>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="0" />
                                Només els responsables veuran la tasca
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="1" />
                                Tothom podrà veure la tasca
                            </label>
                        </div>
                        {errors.visibility && <p className="text-apperror">{errors.visibility.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Data Límit</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep' type="date" {...register("date", { required: 'Has de seleccionar una data límit!' })} />
                        {errors.date && <p className="text-apperror">{errors.date.message}</p>}
                    </div>

                    <button type="submit" className='bg-appbutton text-white w-48 rounded-xl shadow-md my-4 px-6 py-3 font-bold'>Crea l'esdeveniment</button>
                </form>
            </div>
        </div>
    )
}
