import { createContext, useContext, useEffect, useState } from "react";

import { fetchNui, useNuiEvent } from "@/lib/nui";
import { cn, isBrowser } from "@/lib/utils";

const exitKeys = ["Escape"];

type VisiblityContextValue = {
  visible: boolean;
  setVisibility: (visible: boolean) => void;
  hide: () => void;
};

const Context = createContext<VisiblityContextValue>({
  visible: false,
  setVisibility: (_) => {},
  hide: () => {},
});

function getInitialVisibility() {
  return isBrowser();
}

export function VisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisibility] = useState(getInitialVisibility());

  function hide() {
    if (!isBrowser()) {
      fetchNui("hide");
    } else {
      setVisibility(false);
    }
  }

  useNuiEvent<boolean>("setVisibility", setVisibility);

  useEffect(() => {
    if (visible) return;

    function exitHandler(event: KeyboardEvent) {
      if (!exitKeys.includes(event.code)) return;
      hide();
    }

    window.addEventListener("keydown", exitHandler);
    return () => window.removeEventListener("keydown", exitHandler);
  }, []);

  return (
    <Context.Provider
      value={{
        setVisibility: setVisibility,
        visible,
        hide: hide,
      }}
    >
      <>
        <div className={cn("h-full w-full", visible ? "visible" : "hidden")}>
          {children}
        </div>
      </>
    </Context.Provider>
  );
}

export function useVisibility() {
  return useContext(Context);
}
