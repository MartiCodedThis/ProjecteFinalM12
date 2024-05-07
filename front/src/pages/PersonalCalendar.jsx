import React, { useEffect, useState } from 'react'
import { CalendarWidget } from '../components/widgets/CalendarWidget'
import { EventAdd } from './events/EventAdd'
import useServicesContext from '../hooks/useServicesContext'

export const PersonalCalendar = () => {
    const { services: { sessionService, eventService } } = useServicesContext()

    const [isNavOpen, setIsNavOpen] = useState(false)
    const [eventList, setEventList] = useState()
    const [refresh, setRefresh] = useState()


    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }
    let token = sessionService.getToken()
    let eventArray = []
    //This is firing twice somehow
    useEffect(()=>{
        eventService.list(token).then((e)=>{
            e.forEach(event => {
                let a = {}
                a.id = event.id
                a.title = event.name
                a.start = event.date 
                a.end = event.date
                a.allDay = true
                eventArray.push(a)
            })
            setEventList(eventArray)
            eventArray = []
        })
        console.log("eventArray has been loaded")
    },[])


    return (
        <>
            <div className="flex flex-row justify-center w-full mb-10">
                <div className='flex w-min-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3 *:min-w-48 *:text-center *:text-apptext2 *:inline-block *:no-underline *:px-8'>
                    <a href="/" className="hover:text-apptext">Pàg. principal</a>
                    <a href="" className="hover:text-apptext">Branca</a>
                    <a href="" className="hover:text-apptext">Càrrec</a>
                </div>
            </div>
            <div>
                <h2 className="text-5xl font-bold mb-4">Calendari d'events</h2>
                <hr className="border-appsep mb-4"></hr>
            </div>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl divide-y divide-appsep2 p-16 my-16 mx-0 md:mx-20 *:text-apptext2'>
                {eventList ? <CalendarWidget eventList={eventList}></CalendarWidget> : <p className='text-lg font-bold'>Carregant events, espera un moment...</p>}
                <form className='flex justify-center divide-x divide-appsep2 pt-8 mt-8 *:w-full *:text-apptext2 *:text-xs *:sm:text-sm'>
                    <div className='*:text-apptext2 *:flex *:no-underline *:px-2 pr-0 sm:pr-4'>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="pedagògic" name="pedagògic" value="0" />
                            <label for="pedagògic">Càrrec Pedagògic</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="equip_agrupament" name="equip_agrupament" value="1" />
                            <label for="equip_agrupament">Equip d'agrupament</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="tresoreria" name="tresoreria" value="2" />
                            <label for="tresoreria">Tresoreria</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="secretaria" name="secretaria" value="3" />
                            <label for="secretaria">Secretaria</label>
                        </div>
                    </div>
                    <div className='*:text-apptext2 *:flex *:no-underline *:px-2 pl-0 sm:pl-4'>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="follets" name="follets" value="0" />
                            <label for="follets">Follets</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="llobatons" name="llobatons" value="1" />
                            <label for="llobatons">Llobatons</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="puputs" name="puputs" value="2" />
                            <label for="puputs">Puputs</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-1' type="checkbox" id="rangers" name="rangers" value="3" />
                            <label for="puputs">Rangers</label>
                        </div>
                    </div>
                </form>
            </div>
            <button id="nav-toggle" onClick={toggleNav} className="flex items-center px-3 py-2 border rounded text-apptext2 border-apptext2 hover:text-apptext hover:border-apptext">
                <svg className="fill-apptext2 hover:fill-apptext h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Add</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
            <div className={`w-full flex-grow flex items-center w-auto ${isNavOpen ? '' : 'hidden'} block pt-6 lg:pt-0`} id="nav-content">
                <EventAdd></EventAdd>
            </div>
        </>
    )
}
