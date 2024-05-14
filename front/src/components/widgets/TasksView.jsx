import { useState } from 'react'
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
    const offset = currentPage * ITEMS_PER_PAGE
    const currentItems = renderedData.slice(offset, offset + ITEMS_PER_PAGE)
    const pageCount = Math.ceil(renderedData.length / ITEMS_PER_PAGE)

    return (
        <>
            {renderedData.length > 0 ? (
                <>
                    <div className="flex flex-col justify-center mb-7">
                        {currentItems.map(item => (
                            <TaskBanner key={item.id} task={item} />
                        ))}
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<ArrowLeftCircleIcon className="size-6 hover:text-apptext" />}
                        nextLabel={<ArrowRightCircleIcon className="size-6 hover:text-apptext" />}
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        containerClassName='flex justify-center *:px-3'
                    />
                </>
            ) : (
                <p>No hi ha cap tasca.</p>
            )}
        </>
    )
}
