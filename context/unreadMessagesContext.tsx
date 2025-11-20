"use client";

// import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  // useEffect,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

interface UnreadMessagesContextValue {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

const UnreadMessagesContext = createContext<
  UnreadMessagesContextValue | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function UnreadMessagesProvider({ children }: ProviderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session && session.user) {
  //     getUnreadMessageCount().then((res) => {
  //       if (res.count) setUnreadCount(res.count);
  //     });
  //   }
  // }, [getUnreadMessageCount, session]);

  // Memoize the value to prevent unnecessary re-renders of children
  const value = useMemo(() => ({ unreadCount, setUnreadCount }), [unreadCount]);

  return (
    <UnreadMessagesContext.Provider value={value}>
      {children}
    </UnreadMessagesContext.Provider>
  );
}

// Create a custom hook to access context
export function useUnreadMessagesContext() {
  const context = useContext(UnreadMessagesContext);

  if (!context) {
    throw new Error(
      "useUnreadMessages must be used within an UnreadMessagesProvider"
    );
  }
  return context;
}
