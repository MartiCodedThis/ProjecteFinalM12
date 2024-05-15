import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckBadgeIcon, ExclamationTriangleIcon, ClockIcon, EllipsisHorizontalCircleIcon} from '@heroicons/react/24/solid'
// import {EllipsisHorizontalCircleIcon} from '@heroicons/react/24/outline'
export const TaskBanner = (object) => {
  let task = object.task
  console.log(task)
  let nav = useNavigate()

  const getStatus = (status) => {
    switch (status) {
        case 0:
            return <ClockIcon className='h-6 w-6 text-yellow-400'/>
        case 1:
            return <CheckBadgeIcon className='h-6 w-6 text-lime-500'/>
        case 2:
            return <ExclamationTriangleIcon className='h-6 w-6 text-red-600'/>
        default:
            return <ClockIcon className='h-6 w-6'/>
    }
}

  const handleClick = () => {
      nav(`/tasks/${task.id}`, {state: task})
    }
  return (
    <div className="columns-3 p-2 border border-appsep2 mb-2 rounded-md"> <p className='flex flex-row'> <div className='px-2'> {getStatus(task.status)} </div>  {task.name}</p>  <p className='italic text-slate-600'> Data límit: {task.data_limit} </p> <p className='flex flex-row justify-end'><button className='justify-self-end' onClick={handleClick}> <EllipsisHorizontalCircleIcon className='h-6 w-6 text-appbutton' /> </button></p> </div>
  )
}
