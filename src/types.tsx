import React from "react";

export type User = {
    id: number,
    displayName: string,
    username: string,
    email: string,
    role: string,
    createdAt: string,
    photoUrl?: string,
};

export type UserProfile = {
    id: number;
    username: string;
    displayName: string;
    photoUrl?: string;
    posts: Post[];
}

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

export type WebSocketContextProviderProps = {
    children: React.ReactNode;
    token: string;
}

export type UserContextType = {
    user: User,
    auth: boolean,
    setUser:  React.Dispatch<React.SetStateAction<User>>,
    setAuth:  React.Dispatch<React.SetStateAction<boolean>>,
}

export type ValidationErrorResponse = {
    field: string;
    message: string;
}

export type UserSummary = {
    id: number;
    displayName: string;
    photoUrl?: string;
    username: string;
};

export type Conversation = {
    userSummary: UserSummary;
    lastMessage: Message;
};



export type UpdateUserProfileReq = Pick<UserProfile, "username"> & Pick<UserProfile, "displayName"> & Pick<UserProfile, "photoUrl">;

export type Message = {
    id?: number;
    chatId?: number;
    senderId: number;
    recipientId: number;
    senderName: string;
    recipientName: string;
    content: string;
    timestamp: Date;
}

export type Pageable = {
    content: Post[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number,
}


