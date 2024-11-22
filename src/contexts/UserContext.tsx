"use client";

import { createContext, useEffect, useState } from "react";
import { UserContextProviderProps, UserContextType, UserSummary} from "../types.tsx";
import { getUserProfile } from "../api/api.ts";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<UserSummary>({
        id: 0,
        username: "",
        displayName: "",
        photoUrl: "",
    });

    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        const userId = sessionStorage.getItem("user");
        if (userId) {
            getUserProfile(parseInt(userId))
                .then(fetchedUser => {
                    if (fetchedUser) {
                        setUser(fetchedUser);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user profile:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (user.id !== 0) {
            sessionStorage.setItem("user", String(user.id));
            
        }
    }, [user]);

    useEffect(() => {
        sessionStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <UserContext.Provider
            value={{
                user,
                auth,
                setUser,
                setAuth,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
