import React from "react";
import "./page.css";
const Page = ({ children }) => {
  return (
    <main>
      <div className="layaout-page">{children}</div>
    </main>
  );
};

export default Page;
