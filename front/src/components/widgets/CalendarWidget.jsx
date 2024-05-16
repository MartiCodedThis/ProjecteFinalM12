import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useNavigate } from 'react-router-dom'

export const CalendarWidget = (object) => {
  let localizer = momentLocalizer(moment)
  const [eventList, setEventList] = useState()
  useEffect(() => {
    setEventList(object.eventList);
  }, [object.eventList])
  const nav = useNavigate()
  const handleEventClick = event => {
    console.log(event)
    if(event.isTask){
      nav(`/tasks/${event.id}`)
    }
    else{
      nav(`/events/${event.id}`)
    }
  }
  return (
    <div className="min-w-[900px]">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        defaultView="month"
        endAccessor="end"
        style={{
          flexGrow: 1,
          height: 0,
          minHeight: "600px",
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

