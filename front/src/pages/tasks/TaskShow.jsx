import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useServicesContext from '../../hooks/useServicesContext'
import { useParams } from 'react-router-dom'

const TaskShow = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const {services: {taskService, sessionService}} = useServicesContext()
    const [task, setTask] = useState()
    const [responsibles, setResponsibles] = useState()
    const [branca, setBranca] = useState()
    const [carrec, setCarrec] = useState()
    const [refresh, setRefresh] = useState(false)
    const branques = {
      0: "Follets",
      1: "Llobatons",
      2: "Puputs",
      3: "Rangers"
    }
    const carrecs = {
      0: "EA",
      1: "Peda",
      2: "Treso",
      3: "Secre"
    }
    let token = sessionService.getToken()
    const params = useParams()
    useEffect(()=>{
      taskService.get(token,params.id).then((response)=>{
        console.log(response)
        setTask(response.task)
        setResponsibles(response.users)
        if(response.branca.length > 0){
          let branca_id = response.branca[0].branca_id
          if(branca_id in branques){
            setBranca(branques[branca_id])
          }
        }
        if(response.carrec.length > 0){
          let carrec_id = response.carrec.carrec_id
          if(carrec_id in carrecs){
            setCarrec(carrecs[carrec_id])
          }
        }
        setRefresh(false)
      })
    },[refresh])
    const onSubmit = async(data)=>{
      taskService.update(token, params.id, data).then(()=>{
        setRefresh(true)
      })
    }
  return (
    <div> 
      {task ?
        <form onSubmit={handleSubmit(onSubmit)}>
          {task.name}{task.id}
          <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'type="text" {...register("description")} defaultValue={task.description} />
          {task.status == 2 ? <p>Aquesta tasca està fora de termini!!!</p> :
          <></>}
          {task.status == 1 ?
          <>
            <p>Tasca completada!</p>
            <input type="checkbox" value="0" {...register("status")} /> Marca com a pendent
          </>
           : 
           <>
              <input type="checkbox" value="1" {...register("status")} /> Marca com a completada
           </> }
           {responsibles ?  
           <> <p>Persones responsables: </p>
                { responsibles.map((user) => {
                  return (
                    <> {user.user_name} </>
                  )
                })}
           </>
            : <p>No hi ha usuaris assignats com a responsables</p>}
            {branca ? 
             <>{branca}</>
            :            
            <p>La tasca no està associada a cap branca</p> }
            {carrec ? 
             <></>
            :            
            <p>La tasca no està associada a cap carrec</p> }
          <button type='submit'>Guardar canvis</button>
        </form> 
      : <>Carregant...</>}
   
    </div>
  )
}

export default TaskShow