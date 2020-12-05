import React, { Component } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default class Like extends Component {
  render() {
    const { isLike, onLike } = this.props;
    return (
      <span style={{ marginRight: "1rem" }}>
        {isLike ? (
          <FaHeart
            onClick={onLike}
            size={24}
            color="#ff5252"
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaRegHeart
            onClick={onLike}
            size={24}
            color="#ff5252"
            style={{ cursor: "pointer" }}
          />
        )}
      </span>
    );
  }
}
