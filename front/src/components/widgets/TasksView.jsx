import { useState, useEffect } from 'react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { TaskBanner } from './TaskBanner'

const ITEMS_PER_PAGE = 5

export const TasksView = (props) => {
    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    }

    const renderedData = props.tasks

    return (
        <>
            
                <div className="flex flex-col justify-center mb-7">
                    {renderedData.map(item => (
                        <TaskBanner task = {item}></TaskBanner>
                    ))}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={<ArrowLeftCircleIcon className="size-6 hover:text-apptext" />}
                    nextLabel={<ArrowRightCircleIcon className="size-6 hover:text-apptext" />}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={0}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(renderedData.length / ITEMS_PER_PAGE)}

                    renderOnZeroPageCount={null}
                    className='flex justify-center *:px-3'
                />

        </>
    )

}