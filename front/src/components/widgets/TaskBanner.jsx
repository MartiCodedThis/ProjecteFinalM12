import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckBadgeIcon, ExclamationTriangleIcon, ClockIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid'
// import {EllipsisHorizontalCircleIcon} from '@heroicons/react/24/outline'
export const TaskBanner = (object) => {
  let task = object.task
  let nav = useNavigate()

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return <ClockIcon className='h-6 w-6 text-yellow-400' />
      case 1:
        return <CheckBadgeIcon className='h-6 w-6 text-lime-500' />
      case 2:
        return <ExclamationTriangleIcon className='h-6 w-6 text-red-600' />
      default:
        return <ClockIcon className='h-6 w-6' />
    }
  }

  const handleClick = () => {
    nav(`/tasks/${task.id}`, { state: task })
  }
  return (
    <div className="flex flex-row gap-3 items-center justify-between p-2 border border-appsep2 mb-2 rounded-md">
      <div className='flex flex-row'>
        <div className='pr-1'>
          {getStatus(task.status)}
        </div>
        {task.name}
      </div>
      <div className='italic text-slate-600'>
        Data límit: {task.data_limit}
      </div>
      <div className='flex flex-row justify-end'>
        <button className='justify-self-end' onClick={handleClick}>
          <EllipsisHorizontalCircleIcon className='h-6 w-6 text-appbutton' />
        </button>
      </div>
    </div>
  )
}
