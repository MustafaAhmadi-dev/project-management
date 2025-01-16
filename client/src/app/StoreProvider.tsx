"use client";

import { PropsWithChildren, useRef } from "react";
import { AppStore, makeStore } from "@/_lib/store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
