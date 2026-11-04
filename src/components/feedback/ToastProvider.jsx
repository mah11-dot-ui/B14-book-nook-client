"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((message, type = "success") => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((current) => [...current, { id, message, type }]);
        window.setTimeout(() => {
            setToasts((current) => current.filter((item) => item.id !== id));
        }, 4500);
    }, []);

    const value = useMemo(() => ({ toast }), [toast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast toast-end toast-top z-[100] p-4" aria-live="polite">
                {toasts.map((item) => (
                    <div
                        key={item.id}
                        role={item.type === "error" ? "alert" : "status"}
                        className={`alert ${item.type === "error" ? "alert-error" : "alert-success"} shadow-lg`}
                    >
                        <span>{item.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside ToastProvider.");
    }
    return context.toast;
}
