import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({
  pupsPerPage,
  totalPups,
  paginate,
  paginatePrev,
  paginateNext,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPups / pupsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    paginatePrev(currentPage - 1);
  };

  const handleNext = () => {
    paginateNext(currentPage + 1);
  };

  return (
    <nav>
      <div className={classes.container}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous Page
        </button>
        {pageNumbers.map((number) => (
          <div key={number}>
            <button
              className={currentPage === number ? classes.clicked : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </div>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === pageNumbers.length}
        >
          Next Page
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
