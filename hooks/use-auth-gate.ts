"use client";

import { useState, useCallback } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UseAuthGateReturn {
  isAuthGateOpen: boolean;
  openAuthGate: (actionType: "download" | "save" | "print", contentTitle?: string) => void;
  closeAuthGate: () => void;
  executeWithAuth: (action: () => void, actionType: "download" | "save" | "print", contentTitle?: string) => void;
  handleAuthSuccess: () => void;
  pendingAction: (() => void) | null;
  actionType: "download" | "save" | "print" | null;
  contentTitle: string | undefined;
}

export function useAuthGate(): UseAuthGateReturn {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isAuthGateOpen, setIsAuthGateOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [actionType, setActionType] = useState<"download" | "save" | "print" | null>(null);
  const [contentTitle, setContentTitle] = useState<string | undefined>(undefined);

  const openAuthGate = useCallback((actionType: "download" | "save" | "print", contentTitle?: string) => {
    setActionType(actionType);
    setContentTitle(contentTitle);
    setIsAuthGateOpen(true);
  }, []);

  const closeAuthGate = useCallback(() => {
    setIsAuthGateOpen(false);
    setPendingAction(null);
    setActionType(null);
    setContentTitle(undefined);
  }, []);

  const executeWithAuth = useCallback((
    action: () => void,
    actionType: "download" | "save" | "print",
    contentTitle?: string
  ) => {
    // If user is authenticated, execute action immediately
    if (isAuthenticated) {
      action();
      return;
    }

    // If user is not authenticated, show auth gate
    setPendingAction(() => action);
    openAuthGate(actionType, contentTitle);
  }, [isAuthenticated, openAuthGate]);

  // Handle successful authentication
  const handleAuthSuccess = useCallback(() => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    closeAuthGate();
  }, [pendingAction, closeAuthGate]);

  return {
    isAuthGateOpen,
    openAuthGate,
    closeAuthGate,
    executeWithAuth,
    pendingAction,
    actionType,
    contentTitle,
    handleAuthSuccess,
  };
}
