import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useServicesContext from '../../hooks/useServicesContext'
import { TaskBanner } from '../tasks/TaskBanner'
import { TaskAdd } from '../tasks/TaskAdd'

export const EventShow = () => {
    const { services: { sessionService, eventService, taskService } } = useServicesContext()

    const params = useParams()
    let token = sessionService.getToken()
    const [event, setEvent] = useState()
    const [taskList, setTaskList] = useState()
    var filteredTasks = []
    const [isNavOpen, setIsNavOpen] = useState(false)
    useEffect(()=>{
        eventService.get(token, params.id).then((e)=>{
            setEvent(e)
        })
        taskService.list(token).then((t)=>{
            console.log(t)
            t.map(task => {
                if(task.event_id == params.id){
                    filteredTasks.push(task)
                }  
            })
            setTaskList(filteredTasks)
            filteredTasks = []
        })
    },[])
    const toggle = () => {
        setIsNavOpen(!isNavOpen)
    }
  return (
    <>
        {event ? <>  
                    <div>
                        {event.name}{event.date}
                        <div>{event.description}</div>
                    </div> 
                    <h2>Tasques</h2>
                    {taskList ? 
                        taskList.map((task)=>{
                            return(                        
                            <TaskBanner task={task}></TaskBanner>
                        )}) 
                    : <p>Encara no hi ha cap tasca associada</p> }
                    <button id="nav-toggle" onClick={toggle} className="flex items-center px-3 py-2 border rounded text-apptext2 border-apptext2 hover:text-apptext hover:border-apptext">
                        <svg className="fill-apptext2 hover:fill-apptext h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Add</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                    <div className={`w-full flex-grow flex items-center w-auto ${isNavOpen ? '' : 'hidden'} block pt-6 lg:pt-0`} id="nav-content">
                        <TaskAdd></TaskAdd>
                    </div>
                </>
        
        : <p className='text-lg font-bold'>Carregant event, espera un moment...</p>}

        
    </>
    
  )
}
