
import { PostList } from "../components/widgets/PostList"
import { TasksView } from "../components/widgets/TasksView"
import { useNavigate } from 'react-router-dom'
import BrancaSelector from "../components/widgets/BrancaSelector"
import useServicesContext from "../hooks/useServicesContext"
import useUserContext from "../hooks/useUserContext"
import { useEffect, useState } from "react"
import moment from 'moment'



export const Home = () => {
    const nav = useNavigate()
    const { services: { authService, storedSessionService, sessionService, eventService, taskService } } = useServicesContext()
    const { remember } = useUserContext()
    let session =  remember ? storedSessionService : sessionService
    var authToken = session.getToken()
    const [user, setUser] = useState()
    const [selectBranca, setSelectBranca] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [taskList, setTaskList] = useState()
    const [eventList, setEventList] = useState()
    const [weekly, setWeekly] = useState()
    const [allTasks, setAllTasks] = useState([])
    const [weekTasks, setWeekTasks] = useState([])

    function isThisWeek(d) {
        // start and end of this week
        var thisWeek = [moment().utc().startOf('week').toDate(),
                        moment().utc().endOf('week').toDate()];
        //transforma la data en un objecte date per comparar
        var day = new Date(d)
        if(day >= thisWeek[0] && day <= thisWeek[1]){
            return true
        }
        else{
            return false
        }
      }

    function onlyThisWeek(t){
        var weeklyTasks = []
        t.map((task)=>{
            if(isThisWeek(task.data_limit)){
                weeklyTasks.push(task)
            }
        })
        return weeklyTasks
    }
    function toggleWeekly(){
        if(weekly){
            setTaskList(allTasks)
        }
        else{
            setTaskList(weekTasks)
        }
        setWeekly(!weekly)
    }
    useEffect(() => {
        authService.getUser(authToken).then((u) => {
            if (authToken == null || !authToken) {
                let logout = authService.logout(authToken)
                if (logout) {
                session.clearToken()
                session.clearUser()
                setUser(null)
                nav("/login")
                }
            }
            setUser(u.user)
            if (!u.user.branca && u.user.role_id != 1) {
                setSelectBranca(true)
            }
            taskService.list_by_user(authToken, u.user.id).then((list) => {
                setAllTasks(list)
                let week = onlyThisWeek(list)
                setWeekTasks(week)
                setWeekly(true)
                setTaskList(week)
                console.log(list)
            })
            eventService.list(authToken).then((e) => {
                setEventList(e)
            })
        })
        if(authToken == null || !authToken){
            nav("/login")   
        }
    }, [refresh])

   

    return (
        <>
            {user ? <>
                <div className={`${selectBranca ? 'pt-10' : 'hidden'}`} id="nav-content">
                    <BrancaSelector refresh={setRefresh} closePopup={() => setSelectBranca(false)}></BrancaSelector>
                </div>
                <div className="flex flex-row justify-center w-full mb-10">
                    <div className='text-xs md:text-base flex w-min-full md:w-min-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3 w-min-full *:flex *:h-full *:items-center *:justify-center *:md:min-w-48 *:text-center *:text-apptext2 *:inline-block *:no-underline *:px-8'>
                        <a href="/calendar" className="hover:text-apptext">Calendari</a>
                        <a href="/branca" className="hover:text-apptext">Branca</a>
                        {user.carrec != null ?
                            <a href="" className="hover:text-apptext">Càrrec</a>
                            : <></>
                        }

                    </div>
                </div>
            </>
                : <></>}
            <div className="mb-12">
                {weekly ? 
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Tasques setmanals</h2>
                :
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Totes les teves tasques</h2>
                }
                <hr className="border-appsep mb-4"></hr>
                <div className='flex flex-col bg-appfg justify-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10 *:text-apptext2'>
                    {weekly  ? <button className="pb-6" onClick={(()=>toggleWeekly())}>Mostra totes</button> : <button className="pb-6" onClick={(()=>toggleWeekly())}>Mostra aquesta setmana</button> }
                    
                    {taskList ?
                        <TasksView tasks={taskList} />
                        :
                        <p className="text-apptext2">Carregant llista de tasques...</p>}

                </div>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg content-center rounded-2xl shadow-xl p-8 md:p-16 my-8 sm:my-16 mx-0 lg:mx-10'>
                    <div className="mr-5 w-full text-l">
                        {eventList ?
                            <PostList events={eventList} />
                            :
                            <p className="text-apptext2">Carregant llista d'events...</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}