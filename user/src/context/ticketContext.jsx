import { createContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import userAxios from "../baseURL";
import { useUserContext } from "../hooks/useUserAuthContext";

export const TicketContext = createContext();

export const ticketContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return { tickets: action.payload };
    case "ADD_TICKET":
      return { tickets: [...state.tickets, action.payload] };
    case "DELETE_TICKET":
      return state.filter((ticket) => ticket.id !== action.payload);
    case "UPDATE_TICKET":
      return state.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
    default:
      return state;
  }
};

export const TicketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketContextReducer, {
    tickets: [],
  });
  const { user } = useUserContext();
  
  useEffect(() => {
    const getTicket = async () => {
      if (user) { // Check if user exists
        try {
          const ticket = await userAxios.get(`/api/tickets/${user._id}`,{
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          dispatch({ type: "SET_TICKETS", payload: ticket.data });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getTicket();
  }, [user]); 

  return (
    <TicketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};
