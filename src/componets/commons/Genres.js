import React, { Component } from "react";

export default class Genres extends Component {
  render() {
    const {
      items,
      currentGenre,
      onSelectGenre,
      idProparty,
      valueProparty,
    } = this.props;

    return (
      <div>
        <ul className="list-group">
          {items.map((item) => (
            <li
              key={item[idProparty]}
              className={
                item[idProparty] === currentGenre[idProparty]
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => onSelectGenre(item)}
            >
              {item[valueProparty]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Genres.defaultProps = {
  idProparty: "_id",
  valueProparty: "name",
};
