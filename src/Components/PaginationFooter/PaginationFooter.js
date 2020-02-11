import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationFooter = ({totalPerPage, total, paginate}) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(total / totalPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination aria-label="Page navigation example">
      {pageNumbers.map(pageNumber => (
        <PaginationItem key={pageNumber} onClick={() => {paginate(pageNumber)}} >
            <PaginationLink href="#">{pageNumber}</PaginationLink>
        </PaginationItem>
      )) }
    </Pagination>
  )
}

export default PaginationFooter;
