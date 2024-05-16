import React from 'react'

export const getBrancaName = (brancaValue) => {
    switch (brancaValue) {
        case 0:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-follets text-apptext'>Follets</button>
        case 1:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-llobatons text-white'>Llobatons</button>
        case 2:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-puputs text-white'>Puputs</button>
        case 3:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-rangers text-apptext'>Ràngers</button>
        default:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-apperror text-white'>???</button>
    }
}

export const getCarrecName = (carrecValue) => {
    switch (carrecValue) {
        case 0:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-emerald-300 text-apptext'>EA</button>
        case 1:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-orange-700 text-white'>Peda</button>
        case 2:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-indigo-900 text-white'>Treso</button>
        case 3:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-rose-300 text-apptext'>Secre</button>
        default:
            return <button className='min-w-24 rounded-xl shadow-md text-sm p-1 md:px-4 md:py-2 font-bold bg-apperror text-white'>???</button>
    }
}