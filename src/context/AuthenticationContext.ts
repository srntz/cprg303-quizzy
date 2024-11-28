import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IUserData } from "@/src/interfaces/IUserData";

export interface IAuthenticationContext {
  data: IUserData | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUserData | undefined>>;
}

export const AuthenticationContext = createContext<IAuthenticationContext | undefined>(undefined);

export function useAuthenticationContext(): IAuthenticationContext {
  const authenticationData = useContext(AuthenticationContext);

  if (!authenticationData) {
    throw new Error(
      "AuthenticationContext must be defined. Provide a value to AuthenticationContext.Provieder",
    );
  }

  return authenticationData;
}
