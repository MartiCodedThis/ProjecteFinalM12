import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import useServicesContext from '../../hooks/useServicesContext'

const TaskShow = () => {
    const location = useLocation()
    const task = location.state
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const {services: {taskService}} = useServicesContext()
    let branca
    let carrec
    let responsables

  return (
    <div> {task.name}
    <form>
        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'type="text" {...register("description")} defaultValue={task.description} />
        <input type="checkbox" value="1" {...register("status")} /> Marca com a completada
        <button type='submit'>Guardar canvis</button>
    </form>    
    </div>
  )
}

export default TaskShow