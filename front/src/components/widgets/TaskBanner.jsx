import React from 'react'

export const TaskBanner = (object) => {
 let task = object.task
  return (
    <div>{task.name} {task.id} {task.status}</div>
  )
}
