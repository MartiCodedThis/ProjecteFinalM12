
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
            <div className="flex flex-row justify-center w-full mb-10">
                <div className='flex w-96 bg-appfg justify-center divide-x divide-appsep2 rounded-2xl shadow-xl p-3'>
                    <a href="" className="text-apptext2 inline-block no-underline hover:text-apptext px-8">Calendari</a>
                    <a href="" className="text-apptext2 inline-block no-underline hover:text-apptext px-8">Branca</a>
                    <a href="" className="text-apptext2 inline-block no-underline hover:text-apptext px-8">Càrrec</a>
                </div>    
            </div>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Tasques setmanals</h2>
                <hr className="border-appsep mb-4"></hr>
                <TasksView />
            </div>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Feed de posts</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg content-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                    <div className="mr-5 text-l">
                        <PostList />
                    </div>
                </div>
            </div>
        </>
    )
}