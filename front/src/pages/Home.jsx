
import {PostList} from "../components/widgets/PostList"
import {TasksView} from "../components/widgets/TasksView"
import { useNavigate } from 'react-router-dom'
import useUserContext from "../hooks/useUserContext"



export const Home = () => {
    const nav = useNavigate()
    const { authToken} = useUserContext()
    console.log(authToken)
    if(!authToken){
        nav("/login")
    }
    return (
        <>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Tasques setmanals</h2>
                <hr className="border-appsep mb-4"></hr>
                <TasksView/>

            </div>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Feed de posts</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg content-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                    <div className="w-2/3 mr-5 text-l">
                        <PostList/>
                    </div>
                    <div className="w-1/3 flex flex-col ml-5 text-l divide-y divide-appsep2 *:text-apptext2 overflow-wrap break-word">
                        <a href="/calendar" className="w-full p-4">Calendari</a>
                        <a href="" className="w-full p-4">Branques</a>
                        <a href="" className="w-full p-4">Càrrecs</a>
                    </div>
                </div>
            </div>
        </>
    )
}