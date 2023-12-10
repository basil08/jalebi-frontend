import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaginatedList = ({ items, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log(items);

    return (
        <div>
            {/* Display the current items */}
            <ul className='list-group'>
                {currentItems.map((item, index) => {
                    if (item.symbol)
                        return (<Link to={`/token/${item.symbol}`} >
                            <li key={index} className='list-group-item' >
                                <div className='w-50 mt-2 mb-2 text-decoration-none'>
                                    {item.name}
                                </div>

                            </li>
                        </Link>)
                    else
                        return <li key={index}>{item.name}</li>
                })}
            </ul>

            {/* Pagination buttons */}
            <div>
                {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div >
    );
};

export default PaginatedList;