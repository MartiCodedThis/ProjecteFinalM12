import React from 'react'

export const TaskBanner = (object) => {
 let task = object.task
  return (
    <div className="p-2 border border-apptext2 mb-2 rounded-md">{task.name} {task.id} {task.status}</div>
  )
}
