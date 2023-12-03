import { useEffect } from "react";

import { isBrowser } from "./utils";

export async function fetchNui<T = any>(
  eventName: string,
  data?: any,
  mockData?: T,
): Promise<T> {
  if (isBrowser() && mockData) {
    return mockData;
  }

  const getParentResourceName = (window as any)?.GetParentResourceName;
  if (!getParentResourceName)
    throw new Error(
      "Failed to fetch NUI, GetParentResourceName() does not exist.",
    );

  const resourceName: string = getParentResourceName();
  const response = await fetch(`https://${resourceName}/${eventName}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 404)
      throw new Error("Failed to fetch NUI, nui event does not exist.");

    const text = await response.text();
    throw new Error(
      `Failed to fetch NUI, received unsuccessful status: ${response.status} response: ${text}`,
    );
  }

  const json = await response.json();
  return json;
}

type NuiMessage<T = any> = {
  action: string;
  data: T;
};

type NuiHandler<T> = (data: T) => void;

export function useNuiEvent<T = any>(action: string, handler: NuiHandler<T>) {
  function messageListener(event: MessageEvent<NuiMessage<T>>) {
    const { action: eventAction, data } = event.data;
    if (eventAction.toLocaleLowerCase() === action.toLocaleLowerCase()) {
      handler(data);
    }
  }

  useEffect(() => {
    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  });
}
