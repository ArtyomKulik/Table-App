"use client";

import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { AbilityContext } from "./casl/Can";
import { useSelector } from "react-redux";
import ability from "./casl/defineAbility";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProviderContent>{children}</ProviderContent>
    </Provider>
  );
}

function ProviderContent({ children }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <AbilityContext.Provider value={ability(user)}>
      <NextUIProvider>{children}</NextUIProvider>
    </AbilityContext.Provider>
  );
}
