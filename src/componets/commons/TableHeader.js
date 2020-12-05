import React, { Component } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";

//onSort
//sortColumn
export default class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColoumn = this.props.sortColoumn;
    if (sortColoumn.path === path) {
      sortColoumn.order = sortColoumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColoumn.path = path;
      sortColoumn.order = "asc";
    }
    this.props.onSort(sortColoumn);
  };

  renderIcon = (path) => {
    let sortColoumn = this.props.sortColoumn;
    if (sortColoumn.path !== path) return null;
    return sortColoumn.order === "asc" ? (
      <FaSortDown size={24} />
    ) : (
      <FaSortUp size={24} />
    );
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(({ path, key, label }) => (
            <th key={path || key} onClick={() => this.raiseSort(path)}>
              {label} {this.renderIcon(path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
