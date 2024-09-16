import { createContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import userAxios from "../baseURL";
import { useUserContext } from "../hooks/useUserAuthContext";

export const RoadRouteContext = createContext();

export const roadRouteContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROAD_ROUTES":
      return { roadRoutes: action.payload };
    case "ADD_ROAD_ROUTE":
      return { roadRoutes: [...state.roadRoutes, action.payload] };
    case "DELETE_ROAD_ROUTE":
      return state.filter((roadRoute) => roadRoute.id !== action.payload);
    case "UPDATE_ROAD_ROUTE":
      return state.map((roadRoute) =>
        roadRoute.id === action.payload.id ? action.payload : roadRoute
      );
    default:
      return state;
  }
};

export const RoadRouteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roadRouteContextReducer, {
    roadRoutes: [],
  });
  const { user } = useUserContext();

  useEffect(() => {
    const getRoadRoute = async () => {
      if (user) { // Check if user exists
        try {
          const roadRoute = await userAxios.get("/api/roadRoutes/");
          dispatch({ type: "SET_ROAD_ROUTES", payload: roadRoute.data });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRoadRoute();
  }, [user]);

  return (
    <RoadRouteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoadRouteContext.Provider>
  );
};
