import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TaskBanner = (object) => {
 let task = object.task
 let nav = useNavigate()
 const handleClick = () => {
    console.log(task)
    nav(`/tasks/${task.id}`, {state: task})
  }
  return (
    <div className="p-2 border border-apptext2 mb-2 rounded-md">{task.name} {task.id} {task.status} <button onClick={handleClick}>Veure més</button> </div>
  )
}
