import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'


export const CalendarWidget = () => {
  
  const { services: { eventService } } = useServicesContext()
  const { authToken} = useUserContext()
  const [eventList, setEventList] = useState([]);
  console.log(authToken)

  let localizer = momentLocalizer(moment)
  const fetchEvents = async () => {
    var events = await eventService.list(authToken)
    setEventList(events)
  }

  useEffect(()=>{
    fetchEvents()
  },[eventService])
 

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        defaultView="month"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}

