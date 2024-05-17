import React, { useEffect, useState } from 'react'
import { CalendarWidget } from '../components/widgets/CalendarWidget'
import { EventAdd } from '../components/widgets/EventAdd'
import useServicesContext from '../hooks/useServicesContext'
import useUserContext from '../hooks/useUserContext'


export const BrancaCalendar = () => {
    const { services: { sessionService, storedSessionService, taskService } } = useServicesContext()
    const { remember } = useUserContext()
    const [addMenu, setAddMenu] = useState(false)
    const [taskList, setTaskList] = useState()
    const [refresh, setRefresh] = useState(false)

    let session =  remember ? storedSessionService : sessionService
    
    const toggleNav = () => {
        setAddMenu(!addMenu)
    }
    // Fix so it works with remembered sesh!!
    let token = session.getToken()
    let user = session.getUser()

    useEffect(() => {
        if (token) {
            taskService.list_by_branca(token).then((events) => {
                const updatedEventList = events.map(event => ({
                    id: event.id,
                    title: event.name,
                    start: event.date,
                    end: event.date,
                    allDay: true,
                    isTask: true
                }));
                if(updatedEventList){
                    setTaskList(updatedEventList)
                }
                else{
                    setTaskList([])
                }
            }).catch(error => {
                console.error('Error fetching events:', error);
            });
        }
    }, [refresh, token, taskService]);

    return (
        <>
            <div className="flex flex-row justify-center w-full mb-10">
                <div className='text-xs md:text-base flex w-min-full md:w-min-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3 w-min-full *:flex *:h-full *:items-center *:justify-center *:md:min-w-48 *:text-center *:text-apptext2 *:inline-block *:no-underline *:px-8'>
                    <a href="/" className="hover:text-apptext">Pàg. principal</a>
                </div>
            </div>
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-4">Tasques de la branca</h2>
                <hr className="border-appsep mb-4"></hr>
            </div>
            {taskList ? <></> : <p>La teva branca no té tasques actualment</p> }
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10 text-apptext2'>
                <p className='block lg:hidden'>Fes scroll per navegar el calendari.</p>
                <div className='overflow-auto'>
                    {taskList ? <CalendarWidget eventList={taskList} ></CalendarWidget> : <p className='text-md font-bold'>Buscant les tasques, espera un moment...</p>}
                </div>
            </div>
        </>
    )
}
