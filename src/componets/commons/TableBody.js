import React, { Component } from "react";
import _ from "lodash";

export default class TableBody extends Component {
  rendringCell = (item, { path, content }) => {
    if (content) return content(item);
    return _.get(item, path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {this.rendringCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
