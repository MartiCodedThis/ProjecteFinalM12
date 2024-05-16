import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useServicesContext from '../../hooks/useServicesContext'
import { TaskBanner } from '../../components/widgets/TaskBanner'
import { TaskAdd } from '../../components/widgets/TaskAdd'
import sanitizeHtml from 'sanitize-html'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export const EventShow = () => {
    const { services: { sessionService, eventService, taskService } } = useServicesContext()

    const params = useParams()
    let token = sessionService.getToken()
    const [event, setEvent] = useState()
    const [taskList, setTaskList] = useState()
    const [addTask, setAddTask] = useState(false)
    const [refresh, setRefresh] = useState()

    useEffect(() => {
        eventService.get(token, params.id).then((e) => {
            setEvent(e)
        })
        taskService.list(token, params.id).then((t) => {
            setTaskList(t)
        })
    }, [refresh])

    const toggleNav = () => {
        setAddTask(!addTask)
    }

    const prepareInnerHTML = (content) => {
        // Sanitize HTML content
        const sanitized = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['b', 'i', 'u', 's', 'ol', 'ul', 'li']),
            allowedAttributes: {},
        });

        return sanitized;
    }

    return (
        <>
            {event ? <>
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Informació del event</h2>
                    <hr className="border-appsep mb-4"></hr>
                    <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-16 my-10 md:my-16 mx-0 md:mx-20'>
                        <h3 className="text-3xl font-bold mb-2">{event.name}</h3>
                        <div className="flex w-full justify-between mb-4 *:text-sm *:italic *:text-apptext2">
                            <p>{event.author_name}</p>
                            <p>{event.date}</p>
                        </div>
                        <div className="mb-4 prose prose-sm md:prose-base max-w-none prose-appprose prose-ul:list-disc"
                            dangerouslySetInnerHTML={{ __html: prepareInnerHTML(event.description) }} />
                        <h3 className="font-bold text-lg">Tasques</h3>
                        <hr className="border-appsep2 mb-4"></hr>
                        {taskList ?
                            taskList.map((task, id) => {
                                return (
                                    <TaskBanner key={id} task={task}></TaskBanner>
                                )
                            })
                        : <p>Encara no hi ha cap tasca associada</p>}
                        <div>
                            <button id="nav-toggle" onClick={toggleNav} className='flex items-center gap-1 bg-appbutton text-white rounded-xl shadow-md my-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'><PlusCircleIcon className='h-6 w-6' />Afegir tasca</button>
                        </div>
                        <div className={`${addTask ? 'pt-10' : 'hidden'}`} id="nav-content">
                            <TaskAdd event_id={event.id} refresh={setRefresh} closePopup={() => setAddTask(false)}></TaskAdd>
                        </div>
                    </div>
                </div>
            </>
            : <p className='text-lg font-bold'>Carregant event, espera un moment...</p>}
        </>

    )
}
