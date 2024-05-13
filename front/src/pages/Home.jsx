
import {PostList} from "../components/widgets/PostList"
import {TasksView} from "../components/widgets/TasksView"
import { useNavigate } from 'react-router-dom'
import BrancaSelector from "../components/widgets/BrancaSelector"
import useServicesContext from "../hooks/useServicesContext"
import { useEffect, useState } from "react"



export const Home = () => {
    const nav = useNavigate()
    const { services: { authService, sessionService, eventService, taskService} } = useServicesContext()
    var authToken = sessionService.getToken()
    const [user,setUser] =  useState()
    const [selectBranca, setSelectBranca] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [taskList, setTaskList] =useState()
    const [eventList, setEventList] = useState()

    useEffect(()=>{
        authService.getUser(authToken).then((u)=>{
            setUser(u.user)
            if(!u.user.branca && u.user.role_id != 1){
                setSelectBranca(true)
            }
            taskService.list_by_user(authToken, u.user.id).then((list)=>{
                setTaskList(list)
            })
            eventService.list(authToken).then((e) => {
                setEventList(e)
            })
        })
    }, [refresh])

    if(authToken == null || !authToken){
        nav("/login")   
    }
    return (
        <>
            {user ? <>
                <div className={`${selectBranca ? 'pt-10' : 'hidden'}`} id="nav-content">
                    <BrancaSelector refresh={setRefresh} closePopup={() => setSelectBranca(false)}></BrancaSelector>   
                </div>
                
                
                <div className="flex flex-row justify-center w-full mb-10">
                    <div className='text-xs md:text-base flex w-min-full md:w-min-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3 w-min-full *:flex *:h-full *:items-center *:justify-center *:md:min-w-48 *:text-center *:text-apptext2 *:inline-block *:no-underline *:px-8'>
                        <a href="/calendar" className="hover:text-apptext">Calendari</a>
                        <a href="" className="hover:text-apptext">Branca</a>
                        {user.carrec != null ? 
                            <a href="" className="hover:text-apptext">Càrrec</a> 
                        : <></>
                        }
                        
                    </div>  
                </div>
            </>
            : <></> }
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Tasques setmanals</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10 *:text-apptext2'>
                    {taskList ? 
                        <TasksView tasks = {taskList} />
                    : 
                    <>Carregant llista de tasques...</>}
                    
                </div>
            </div>
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Feed de posts</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg content-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10'>
                    <div className="mr-5 text-l">
                        {eventList ? 
                        <PostList events = {eventList} />
                        :
                        <>Carregant posts...</>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}