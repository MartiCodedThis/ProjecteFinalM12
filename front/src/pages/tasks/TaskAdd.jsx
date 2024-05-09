import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useServicesContext from '../../hooks/useServicesContext'


export const TaskAdd = (props) => {
    const { services: { sessionService, taskService, authService } } = useServicesContext()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [userList, setUserList] = useState([])
    let token = sessionService.getToken()
    useEffect(()=>{
        authService.listUsers(token).then((e)=>{
            setUserList(e.userlist)
        })
    },[])

    
    const onSubmit = async (data) => {
        taskService.create(token, data)
        reset()
    }

  return (
    <form className='flex flex-col items-center w-full md:w-2/3' onSubmit={handleSubmit(onSubmit)}>
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
            <input type="date" {...register("data_limit", { required: 'Has de seleccionar una data límit!' })} />
            {errors.date && <p className="text-apperror">{errors.date.message}</p>}
        </div>
        <div>
            <label className='font-bold mb-1'>Branca</label>
            <div>
                <input type="radio" {...register("branca_id")} value="" />
                Cap branca
            </div>
            <div>
                <input type="radio" {...register("branca_id")} value="0" />
                Follets
            </div>
            <div>
                <input type="radio" {...register("branca_id")} value="1" />
                Llobatons
            </div>
            <div>
                <input type="radio" {...register("branca_id")} value="2" />
                Puputs
            </div>
            <div>
                <input type="radio" {...register("branca_id")} value="3" />
                Ràngers
            </div>
        </div>
        <div>
            <label className='font-bold mb-1'>Càrrec</label>
            <div>
                <input type="radio" {...register("carrec_id")} value="" />
                Cap càrrec
            </div>
            <div>
                <input type="radio" {...register("carrec_id")} value="0" />
                Equip d'Agrupament
            </div>
            <div>
                <input type="radio" {...register("carrec_id")} value="1" />
                Pedagògic
            </div>
            <div>
                <input type="radio" {...register("carrec_id")} value="2" />
                Tresoreria
            </div>
            <div>
                <input type="radio" {...register("carrec_id")} value="3" />
                Secretaria
            </div>
        </div>
        <div>
            <label className='font-bold mb-1'>Responsables: </label>
                {userList ?
                    userList.map((user)=>{
                            return( 
                                <>
                                    <input type="checkbox" {...register("responsables")} value={user.id}/> {user.name} |
                                </>               
                            )}) 
                : <p>Carregant usuaris...</p>}
        </div>
        <input type="hidden"  {...register("event_id")} value={props.event_id} ></input>
        

        <button type="submit" className='bg-appbutton text-appwhite w-48 rounded-xl shadow-md my-4 px-6 py-3 font-bold'>Crea l'esdeveniment</button>
    </form>
  )
}
