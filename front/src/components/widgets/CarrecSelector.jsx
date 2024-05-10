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
    <div>
        <p>Selecciona el teu carrec</p>
        <div>
            <button onClick={()=>selectCarrec(0)} >Equip d'Agrupament</button>
        </div>
        <div>
            <button onClick={()=>selectCarrec(1)}>Pedagògic</button>
        </div>
        <div>
            <button onClick={()=>selectCarrec(2)}>Tresoreria</button>
        </div>
        <div>
            <button onClick={()=>selectCarrec(3)}>Secretaria</button>
        </div>  
        <div>
            <button onClick={()=>selectCarrec(4)}>No tinc carrec</button>
        </div>
    </div>
  )
}

export default CarrecSelector