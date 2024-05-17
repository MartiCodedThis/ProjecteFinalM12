import React from 'react'
import useServicesContext from '../../hooks/useServicesContext'

const BrancaSelector = (props) => {
    const {services: {authService, sessionService}} = useServicesContext()
    let token = sessionService.getToken()
    const selectBranca=(branca_id)=>{
        authService.branca(token, branca_id).then(()=>{
            props.refresh(true)
            props.closePopup(true)
        })
    }
  return (
    <div className='border-2 border-appsep2 rounded-md mb-4'>    
        <div className="flex flex-wrap justify-between px-4 *:min-w-32 gap-2 my-2 *:rounded-xl *:shadow-md *:px-4 *:py-2 *:font-bold">
            <button className="bg-follets text-apptext hover:brightness-110 active:brightness-90" onClick={()=>selectBranca(0)} >Follets</button>
            <button className="bg-llobatons text-white hover:brightness-110 active:brightness-90" onClick={()=>selectBranca(1)}>Llobatons</button>
            <button className="bg-puputs text-white hover:brightness-110 active:brightness-90" onClick={()=>selectBranca(2)}>Puputs</button>
            <button className="bg-rangers text-apptext hover:brightness-110 active:brightness-90" onClick={()=>selectBranca(3)}>Ràngers</button>
        </div>  
    </div>
  )
}

export default BrancaSelector