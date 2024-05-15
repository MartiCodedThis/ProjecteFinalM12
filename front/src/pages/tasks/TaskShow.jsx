import { CheckCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useServicesContext from '../../hooks/useServicesContext'
import { useParams } from 'react-router-dom'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { RichTextEditor } from '../../components/widgets/RichTextEditor'

const TaskShow = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { services: { taskService, sessionService } } = useServicesContext()
  const [task, setTask] = useState()
  const [responsibles, setResponsibles] = useState()
  const [branques, setBranques] = useState([])
  const [carrec, setCarrec] = useState()
  const [refresh, setRefresh] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const branques_keys = {
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
  useEffect(() => {
    taskService.get(token, params.id).then((response) => {
      setTask(response.task)
      setResponsibles(response.users)
      if (response.branca.length > 0) {
        let aux = []
        response.branca.map((b) => {
          console.log(b.branca_id)
          if (b.branca_id in branques_keys) {
            aux.push(branques_keys[b.branca_id])
          }
        })
        setBranques(aux)
      }
      if (response.carrec.length > 0) {
        let carrec_id = response.carrec.carrec_id
        if (carrec_id in carrecs) {
          setCarrec(carrecs[carrec_id])
        }
      }
      setRefresh(false)
    })
  }, [refresh])
  const onSubmit = async (data) => {
    taskService.update(token, params.id, data).then(() => {
      setRefresh(true)
    })
  }
  return (
    <>
      {task ?
        <>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Informació de la tasca</h2>
            <hr className="border-appsep mb-4"></hr>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-16 my-10 md:my-16 mx-0 md:mx-20'>

              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-3xl font-bold mb-2">{task.name}</h3>
                <p className="flex w-full justify-between mb-4 text-sm italic text-apptext2">Finalitza a {task.data_limit}</p>
                {responsibles ?
                  <> <h4 className='font-bold text-apptext2'>Persones responsables: </h4>
                    {responsibles.map((user) => {
                      return (
                        <> {user.user_name} </>
                      )
                    })}
                  </>
                  : <p>No hi ha usuaris assignats com a responsables.</p>}
                <h4 className='font-bold text-apptext2'>Branques asociades:</h4>
                {branques ?
                  <>{
                    branques.map((b) => {
                      return (
                        <> {b} </>
                      )
                    })
                  }</>
                  :
                  <p>La tasca no està associada a cap branca.</p>}
                <h4 className='font-bold text-apptext2'>Càrrecs asociats:</h4>
                {carrec ?
                  <></>
                  :
                  <p>La tasca no està associada a cap càrrec.</p>}
                <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
                <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep' type="text" {...register("description")} defaultValue={task.description} />
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
                  </>}

                <button type='submit' className='flex items-center gap-1 bg-appbutton text-white rounded-xl shadow-md my-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'><CheckCircleIcon className='h-6 w-6' />Guardar canvis</button>
              </form>
            </div>
          </div>
        </>
        : <>Carregant...</>}

    </>
  )
}

export default TaskShow