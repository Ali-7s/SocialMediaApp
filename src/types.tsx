import React from "react";

export type User = {
    "id": number,
    "displayName": string,
    "username": string,
    "email": string,
    "role": string,
    "createdAt": string,
    "photoUrl": string,
};

export type Post = {
    id: number;
    content: string;
    createdAt: string;
    user: User;
};

export type UserRegistration = {
    email: string;
    username: string;
    displayName: string;
    password: string;
};

export type UserLogin = {
    email: string;
    password: string;
};

export type PostRequest = {
    content: string
}

export type UpdatePostRequest = {
    id: number,
    content: string
}

export type UserContextProviderProps = {
    children: React.ReactNode;
}

export type UserContextType = {
    user: User,
    setUser:  React.Dispatch<React.SetStateAction<User>>
}

export type ValidationErrorResponse = {
    field: string;
    message: string;
}

