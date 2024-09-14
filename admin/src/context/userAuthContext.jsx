import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("manager"));
    const now = new Date();
    if (user) {
      if (now.getTime() > user.expiry) {
        localStorage.removeItem("manager");
      }
    }
    user = JSON.parse(localStorage.getItem("manager"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
