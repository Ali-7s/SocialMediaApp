"use client"

import {createContext, useState} from 'react'
import {User, UserContextProviderProps, UserContextType} from "../types.tsx";

export const UserContext = createContext<UserContextType | null>(null)

const UserContextProvider = ( { children } : UserContextProviderProps) => {
    const [user, setUser] = useState<User>( {
        "id": 0,
        "username": "",
        "displayName": "",
        "email": "",
        "role": "",
        "createdAt": "",
        "photoUrl": "",}
    )
    const [auth, setAuth] = useState(false)

    return (
      <UserContext.Provider value={{
          user, auth,  setUser, setAuth
      }}>
          {children}
      </UserContext.Provider>
    )
}


export default UserContextProvider


