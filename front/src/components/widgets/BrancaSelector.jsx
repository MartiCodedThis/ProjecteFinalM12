import React from 'react'
import useServicesContext from '../../hooks/useServicesContext'

const BrancaSelector = (props) => {
    const {services: {authService, sessionService}} = useServicesContext()
    let token = sessionService.getToken()
    const selectBranca=(branca_id)=>{
        authService.branca(token, branca_id).then(()=>{
            props.refresh(true)
        })
    }
  return (
    <div>
        <p>Selecciona la teva branca</p>
        <div>
            <button onClick={()=>selectBranca(0)} >Follets</button>
        </div>
        <div>
            <button onClick={()=>selectBranca(1)}>Llobatons</button>
        </div>
        <div>
            <button onClick={()=>selectBranca(2)}>Puputs</button>
        </div>
        <div>
            <button onClick={()=>selectBranca(3)}>Ràngers</button>
        </div>  
    </div>
  )
}

export default BrancaSelector