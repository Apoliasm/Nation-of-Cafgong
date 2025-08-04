"use client";

import React, { createContext, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";

export default function VisitTimeStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  typeof storeRef;
  if (!storeRef.current) {
    //첫 렌더링 시 store 생성 -> 싱글톤으로 store 활용됨
    storeRef.current = makeStore();
  }

  //provider 컴포넌트에서 store로 context를 만들어 주입하는 방식
  //provider를 만듦면 context를 자체적으로 만들 필요가 없음
  return <Provider store={storeRef.current}>{children}</Provider>;
}
