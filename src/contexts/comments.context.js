import * as React from "react"

export const CommentsContext = React.createContext();

export const CommentsProvider = ({ children }) => {
  const [showComments, setShowComments] = React.useState(false);

  return (
    <CommentsContext.Provider value={{ showComments, setShowComments }}>
      {children}
    </CommentsContext.Provider>
  );
};