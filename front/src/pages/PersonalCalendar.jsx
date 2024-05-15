import React, { useEffect, useState } from 'react'
import { CalendarWidget } from '../components/widgets/CalendarWidget'
import { EventAdd } from '../components/widgets/EventAdd'
import useServicesContext from '../hooks/useServicesContext'
import useUserContext from '../hooks/useUserContext'


export const PersonalCalendar = () => {
    const { services: { sessionService, storedSessionService, eventService } } = useServicesContext()
    const { remember } = useUserContext()
    const [addMenu, setAddMenu] = useState(false)
    const [eventList, setEventList] = useState([])
    const [refresh, setRefresh] = useState(false)

    let session =  remember ? storedSessionService : sessionService
    
    const toggleNav = () => {
        setAddMenu(!addMenu)
    }
    // Fix so it works with remembered sesh!!
    let token = session.getToken()

    useEffect(() => {
        console.log("TOken:" + token)
        if (token) {
            eventService.list(token).then((events) => {
                const updatedEventList = events.map(event => ({
                    id: event.id,
                    title: event.name,
                    start: event.date,
                    end: event.date,
                    allDay: true
                }));
                console.log(updatedEventList)
                setEventList(updatedEventList);
            }).catch(error => {
                console.error('Error fetching events:', error);
            });
        }
    }, [refresh, token, eventService]);

    return (
        <>
            <div className="flex flex-row justify-center w-full mb-10">
                <div className='text-xs md:text-base flex w-min-full md:w-min-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3 w-min-full *:flex *:h-full *:items-center *:justify-center *:md:min-w-48 *:text-center *:text-apptext2 *:inline-block *:no-underline *:px-8'>
                    <a href="/" className="hover:text-apptext">Pàg. principal</a>
                </div>
            </div>
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-4">Calendari d'events</h2>
                <hr className="border-appsep mb-4"></hr>
            </div>
            <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10 text-apptext2'>
                <p className='block lg:hidden'>Fes scroll per navegar el calendari.</p>
                <div className='overflow-auto'>
                    {eventList ? <CalendarWidget eventList={eventList} ></CalendarWidget> : <p className='text-md font-bold'>Carregant events, espera un moment...</p>}
                </div>
                <button id="nav-toggle" onClick={toggleNav} className='bg-appbutton self-center text-white w-48 rounded-xl shadow-md mt-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'>Afegir event</button>                
                {/* <h3 className='font-bold'>Filtres</h3>
                <hr className="border-appsep2 mb-4"></hr>
                <form className='flex justify-center divide-x divide-appsep2 pt-4 *:w-full *:text-apptext2 *:text-xs *:sm:text-sm'>
                    <div className='*:text-apptext2 *:flex *:no-underline *:px-2 pr-0 sm:pr-4'>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="pedagògic" name="pedagògic" value="0" />
                            <label htmlFor="pedagògic">Càrrec pedagògic</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="equip_agrupament" name="equip_agrupament" value="1" />
                            <label htmlFor="equip_agrupament">Equip d'agrupament</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="tresoreria" name="tresoreria" value="2" />
                            <label htmlFor="tresoreria">Tresoreria</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="secretaria" name="secretaria" value="3" />
                            <label htmlFor="secretaria">Secretaria</label>
                        </div>
                    </div>
                    <div className='*:text-apptext2 *:flex *:no-underline *:px-2 pl-0 sm:pl-4'>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="follets" name="follets" value="0" />
                            <label htmlFor="follets">Follets</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="llobatons" name="llobatons" value="1" />
                            <label htmlFor="llobatons">Llobatons</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="puputs" name="puputs" value="2" />
                            <label htmlFor="puputs">Puputs</label>
                        </div>
                        <div>
                            <input className='w-4 h-4 mr-2' type="checkbox" id="rangers" name="rangers" value="3" />
                            <label htmlFor="puputs">Rangers</label>
                        </div>
                    </div>
                </form> */}
            </div>
            <div className={`${addMenu ? '' : 'hidden'}`} id="nav-content">
                <EventAdd refresh={setRefresh} closePopup={() => setAddMenu(false)}></EventAdd>
            </div>
        </>
    )
}
