import { createContext, useContext } from "react";
import { currentUserType } from "types/context.types";
import { currentUserObject } from "utils";


export const CurrentUserContext = createContext<currentUserType>({ currentUser: currentUserObject, setCurrentUser: user => console.warn('no user!') })

export const useCurrentUser = () => useContext(CurrentUserContext)