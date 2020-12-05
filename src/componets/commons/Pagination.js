import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const Pagination = ({
  itemsCount,
  pageSize,
  onChangePage,
  currentPage,
}) => {
  let endIndex = Math.ceil(itemsCount / pageSize);
  if (endIndex === 1) return null;

  let pages = _.range(1, endIndex + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((item) => (
          <li
            key={item}
            className={currentPage === item ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
          >
            <a
              href="#4"
              onClick={() => onChangePage(item)}
              className="page-link"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
