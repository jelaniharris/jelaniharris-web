import * as React from "react"

const PreMain = ({children, additionalClasses}) => {
  return (
    <div className={`pre-main ${additionalClasses}`}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default PreMain;
