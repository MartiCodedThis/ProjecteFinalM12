import React from 'react'
import useServicesContext from '../../hooks/useServicesContext'

const CarrecSelector = (props) => {
    const {services: {authService, sessionService}} = useServicesContext()
    let token = sessionService.getToken()
    const selectCarrec=(carrec_id)=>{
        authService.carrec(token, carrec_id).then(()=>{
            props.refresh(true)
            props.closePopup(true)
        })
    }
  return (
    <div className='mb-4'>
    <p>Selecciona el teu càrrec:</p>
    <div className="flex flex-wrap *:min-w-32 gap-2 my-2 *:rounded-xl *:shadow-md *:px-4 *:py-2 *:font-bold">
        <button className="bg-emerald-300 text-apptext hover:brightness-110 active:brightness-90" onClick={()=>selectCarrec(0)} >EA</button>
        <button className="bg-orange-700 text-white hover:brightness-110 active:brightness-90" onClick={()=>selectCarrec(1)}>Peda</button>
        <button className="bg-indigo-900 text-white hover:brightness-110 active:brightness-90" onClick={()=>selectCarrec(2)}>Treso</button>
        <button className="bg-rose-300 text-apptext hover:brightness-110 active:brightness-90" onClick={()=>selectCarrec(3)}>Secre</button>
    </div>  
</div>
  )
}

export default CarrecSelector