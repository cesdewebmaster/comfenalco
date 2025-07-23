import React from 'react';
import './Pagination.scss'

interface Props {
    rowsPerPage: number,
    totalRows: number,
    changePage: (number: number) => void,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ rowsPerPage, totalRows, changePage, currentPage, setCurrentPage }: Props) => {

    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='a-pagination' aria-label='Paginación'>
            <button
                className={`btn-controls ${(currentPage !== 1) ? 'active' : ''}`}
                disabled={(currentPage === 1)}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Anterior
            </button>

            <div className='pagination-numbers'>
                {
                    pageNumbers.map(number => (
                        <button
                            key={number}
                            className={(currentPage === number) ? 'active' : ''}
                            onClick={() => changePage(number)}
                        >
                            {number}
                        </button>
                    ))
                }
            </div>

            <button
                className={`btn-controls ${pageNumbers.length !== currentPage ? 'active' : ''}`}
                disabled={pageNumbers.length === currentPage}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination