import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useNavigate } from 'react-router-dom'

export const CalendarWidget = (object) => {
  let localizer = momentLocalizer(moment)
  const [eventList, setEventList] = useState()
  useEffect(()=>{
    setEventList(object.eventList)
  },eventList)
  const nav = useNavigate()
  const handleEventClick = event => {
    nav(`/events/${event.id}`)
  }
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        defaultView="month"
        endAccessor="end"
        style={{ height: 500 }}
        views = {{
          month:true,
          week:false
        }}
        onSelectEvent={handleEventClick}
      />
    </div>
  )
}

