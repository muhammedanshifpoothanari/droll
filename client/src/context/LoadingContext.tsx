import { createContext, useContext, useState } from "react";

// Create the LoadingContext
const LoadingContext = createContext({
    isLoading: false,
    setLoading: (state: boolean) => {},
});

// Custom hook to use the LoadingContext
export const useLoading = () => useContext(LoadingContext);

// LoadingProvider component to wrap your layout
export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
