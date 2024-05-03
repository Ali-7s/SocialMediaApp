export type User = {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
};

export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: User;
};

export type UserRegistration = {
    email: string;
    username: string;
    password: string;
};

export type UserLogin = {
    email: string;
    password: string;
};

