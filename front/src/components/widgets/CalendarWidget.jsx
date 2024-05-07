import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

export const CalendarWidget = (eventList) => {
  let localizer = momentLocalizer(moment)
 
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

