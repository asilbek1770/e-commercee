import React from "react";

export const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control" name={name} id={name} {...rest} />
      {error && <p className="alert alert-danger">{error}</p>}
    </div>
  );
};
