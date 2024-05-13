import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import sanitizeHtml from 'sanitize-html';

const ITEMS_PER_PAGE = 5

export const PostList = () => {
    const nav = useNavigate() 

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    const fetchDataFromDB = async () => {
        const data = [...Array(100).keys()].map((i) => ({ id: i }))
        setData(data)
    }

    useEffect(() => {
        fetchDataFromDB()
    }, [])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    }

    const prepareInnerHTML = (content) => {
        // Sanitize HTML content
        const sanitized = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['b','i','u','s','ol','ul','li']),
            allowedAttributes: {},
        });

        return sanitized;
    }

    const truncateText = (post) => {
        // Find the index of the first closing tag for <p>, <ol>, or <ul>
        const closingTags = ['</p>', '</ol>', '</ul>'];
        let closingTagIndex = -1;
    
        for (const tag of closingTags) {
            closingTagIndex = post.indexOf(tag);
            if (closingTagIndex !== -1) {
                // Found a closing tag, break the loop
                break;
            }
        }
    
        // If closing tag exists, slice the string up to that point
        if (closingTagIndex !== -1) {
            // Add the length of the closing tag itself
            const truncatedPost = post.slice(0, closingTagIndex + closingTags.find(tag => closingTagIndex !== -1).length);
            // Add " ..." at the end
            return truncatedPost + " ...";
        } else {
            // If closing tag doesn't exist, return the original post
            return post;
        }
    }

    const renderedData = data.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

    return (
        <>
                <div className="flex flex-col justify-center">
                    {renderedData.map(item => (
                        <div key={item.id} className="w-full p-4 mb-4 overflow-wrap break-word">
                            <h3 className="text-3xl font-bold mb-2">Post</h3>
                            <div className="flex w-full justify-between mb-4 *:text-sm *:italic *:text-apptext2">
                                <p>Author</p>
                                <p>Timestamp</p>
                            </div>
                            <div className="mb-4 prose prose-sm md:prose-base max-w-none prose-appprose prose-ul:list-disc"
                            dangerouslySetInnerHTML={{ __html: prepareInnerHTML(truncateText("<ol><li>dsasdds</li></ol> <p>Quisque vel eros nec metus eleifend hendrerit. Phasellus blandit, orci iaculis molestie aliquam, dui arcu faucibus nunc, a fringilla libero mi at diam. Sed vel augue sollicitudin, tincidunt nibh non, vehicula libero. Proin posuere sodales purus eu consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras placerat lorem nec pellentesque scelerisque. Nulla facilisi. Praesent eu vestibulum mauris. Donec congue nunc ac nunc suscipit laoreet.</p>")) }} />
                            <button onClick={() => nav("/")} className='bg-appbutton text-white w-36 rounded-xl shadow-md py-2 font-bold hover:brightness-110 active:brightness-90'>Veure més</button>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={<ArrowLeftCircleIcon className="size-6" />}
                    nextLabel={<ArrowRightCircleIcon className="size-6" />}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(data.length / ITEMS_PER_PAGE)}

                    renderOnZeroPageCount={null}
                    className='flex justify-center *:px-3 text-apptext2'
                />

        </>
    )

}