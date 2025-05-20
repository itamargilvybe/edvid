// ClientRootProvider: Client-side provider for Jotai, React Query, and Toast notifications.
"use client";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import Toast from "@/components/ui/Toast";

export default function ClientRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useRef ensures the QueryClient is only created once per client session
  const queryClientRef = useRef<null | QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Toast />
        {children}
      </QueryClientProvider>
    </JotaiProvider>
  );
}
