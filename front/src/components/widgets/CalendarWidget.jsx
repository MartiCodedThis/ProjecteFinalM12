import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

export const CalendarWidget = (object) => {
  let localizer = momentLocalizer(moment)
  const [eventList, setEventList] = useState()
  useEffect(()=>{
    setEventList(object.eventList)
  },eventList)
  
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

