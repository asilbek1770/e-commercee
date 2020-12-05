import React, { Component } from "react";

import { Table } from "./commons/Table";

class Movieas extends Component {
  render() {
    const { movies, onLike, onDelete, onSort, sortColoumn, user } = this.props;

    return (
      <Table
        onDelete={onDelete}
        sortColoumn={sortColoumn}
        onSort={onSort}
        onLike={onLike}
        movies={movies}
        user={user}
      />
    );
  }
}

export default Movieas;
