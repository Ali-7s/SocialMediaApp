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

    return (
      <UserContext.Provider value={{
          user, setUser
      }}>
          {children}
      </UserContext.Provider>
    )
}


export default UserContextProvider


