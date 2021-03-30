// libs
import React from "react";
// others
import "./style.css";

/**
 * EllipsisContent
 * @param {string} children
 */
const EllipsisContent = ({ children, width = "auto", classname }) => (
  <div className={`ellipsis-content-wrapper ${classname}`} style={{ width }}>
    {children}
  </div>
);

export default EllipsisContent;
