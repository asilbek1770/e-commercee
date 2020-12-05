import _ from "lodash";

export const paginate = (items, currentPage, pageSize) => {
  let startIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};
