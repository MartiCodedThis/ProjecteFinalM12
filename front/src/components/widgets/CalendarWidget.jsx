import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './calendar.css'

export const CalendarWidget = (object) => {
  let localizer = momentLocalizer(moment)
  const [eventList, setEventList] = useState()
  useEffect(() => {
    setEventList(object.eventList);
  }, [object.eventList])
  const nav = useNavigate()
  const handleEventClick = event => {
    if(event.isTask){
      nav(`/tasks/${event.id}`)
    }
    else{
      nav(`/events/${event.id}`)
    }
  }
  return (
    <div className="min-w-[1200px] custom-calendar">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        defaultView="month"
        endAccessor="end"
        style={{
          flexGrow: 1,
          height: 0,
          minHeight: "700px",
        }}
        views={{
          month: true,
          week: false
        }}
        onSelectEvent={handleEventClick}
      />
    </div>
  )
}

