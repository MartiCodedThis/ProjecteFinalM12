import { useState, useEffect } from 'react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'

const ITEMS_PER_PAGE = 5

export const TasksView = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    const fetchDataFromDB = async () => {
        const data = [...Array(100).keys()].map((i) => ({ id: i, name: `Item ${i + 1}` }))
        setData(data)
    }

    useEffect(() => {
        fetchDataFromDB()
    }, [])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    }

    const renderedData = data.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

    return (
        <>
            
                <div className="flex flex-col justify-center mb-7">
                    {renderedData.map(item => (
                        <div key={item.id} className="p-2 border border-apptext2 mb-2 rounded-md">
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={<ArrowLeftCircleIcon className="size-6 hover:text-apptext" />}
                    nextLabel={<ArrowRightCircleIcon className="size-6 hover:text-apptext" />}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={0}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(data.length / ITEMS_PER_PAGE)}
                    renderOnZeroPageCount={null}
                    className='flex justify-center *:px-3'
                />

        </>
    )

}