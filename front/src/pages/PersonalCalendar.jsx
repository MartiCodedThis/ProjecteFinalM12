import React, {useEffect, useState} from 'react'
import { CalendarWidget } from '../components/widgets/CalendarWidget'
import { EventAdd } from './events/EventAdd'
import useServicesContext from '../hooks/useServicesContext'

export const PersonalCalendar = () => {
    const { services: { sessionService, eventService } } = useServicesContext()

    const [isNavOpen, setIsNavOpen] = useState(false)

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }
    let token = sessionService.getToken()
    let eventList
    useEffect(()=>{
        eventList = eventService.list(token)
        console.log(eventList)
    })
  return (
    <>
        <div>
            <nav>
            <button id="nav-toggle" onClick={toggleNav} className="flex items-center px-3 py-2 border rounded text-apptext2 border-apptext2 hover:text-apptext hover:border-apptext">
                <svg className="fill-apptext2 hover:fill-apptext h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Add</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
            <div className={`w-full flex-grow flex items-center w-auto ${isNavOpen ? '' : 'hidden'} block pt-6 lg:pt-0`} id="nav-content">
                <EventAdd></EventAdd>
            </div>
                Filtra per: 
                <form>
                    <div>
                        <input type="checkbox" id="pedagògic" name="pedagògic" value="0"/>
                        <label for="pedagògic"> Càrrec Pedagògic </label>
                        <input type="checkbox" id="equip_agrupament" name="equip_agrupament" value="1"/>
                        <label for="equip_agrupament"> Equip d'Agrupament </label>
                        <input type="checkbox" id="tresoreria" name="tresoreria" value="2"/>
                        <label for="tresoreria"> Tresoreria </label>
                        <input type="checkbox" id="secretaria" name="secretaria" value="3"/>
                        <label for="secretaria"> Secretaria </label>
                    </div>  
                    <div>
                        <input type="checkbox" id="follets" name="follets" value="0"/>
                        <label for="follets"> Follets </label>
                        <input type="checkbox" id="llobatons" name="llobatons" value="1"/>
                        <label for="llobatons"> Llobatons </label>
                        <input type="checkbox" id="puputs" name="puputs" value="2"/>
                        <label for="puputs"> Puputs </label>
                        <input type="checkbox" id="rangers" name="rangers" value="3"/>
                        <label for="puputs"> Rangers </label>
                    </div>        
                </form>
            </nav>
            {eventList ? <CalendarWidget eventList={eventList} ></CalendarWidget> : <p>Carregant events, espera un moment</p>}
        </div>
    </>
  )
}
