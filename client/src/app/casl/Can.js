import { createContext, useContext } from "react";
import { createContextualCan } from "@casl/react";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAbility = () => useContext(AbilityContext);
