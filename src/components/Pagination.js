import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data, handlePageClick }) => {
  return (
    <div className="row">
      <div className="col-12 text-right">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={data ? data.total_pages : 0}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination flex-wrap justify-content-end mt-5"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          forcePage={data && data.page - 1}
        />
      </div>
    </div>
  );
};

export default Pagination;
