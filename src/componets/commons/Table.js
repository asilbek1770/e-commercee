import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Like from "./Like";
import { Link } from "react-router-dom";

export const Table = ({
  movies,
  onLike,
  onDelete,
  onSort,
  sortColoumn,
  user,
}) => {
  let columns = [
    {
      path: "title",
      label: "Title",
      content: ({ _id, title }) => <Link to={`/movies/${_id}`}>{title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      label: "Action",
      content: ({ isLike, _id }) => (
        <>
          <Like isLike={isLike} onLike={() => onLike(_id)} />
          {user?.isAdmin && (
            <button onClick={() => onDelete(_id)} className="btn btn-danger">
              Delete
            </button>
          )}
        </>
      ),
      key: "_",
    },
  ];

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColoumn={sortColoumn}
      />
      <TableBody
        columns={columns}
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};
