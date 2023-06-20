import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const generatePageNumbers = () => {
            const visiblePages = 3;
            const range = Math.min(visiblePages, totalPages);
            const startPage = Math.max(currentPage - Math.floor(range / 2), 1);
            const endPage = startPage + range - 1;

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            setPageNumbers(pages);
        };

        generatePageNumbers();
    }, [totalPages, currentPage]);

    return (
        <ul className="pagination justify-content-center">
            {currentPage > 1 && (
                <li className="page-item">
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        Previous
                    </button>
                </li>
            )}

            {pageNumbers.map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                </li>
            ))}

            {currentPage < totalPages && (
                <li className="page-item">
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                        Next
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Pagination;
