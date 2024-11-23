import axios, {AxiosRequestConfig} from "axios";
import {useQuery} from "@tanstack/react-query";
import {
    Message,
    Pageable,
    Post,
    PostRequest,
    UpdatePostRequest,
    User,
    UserSummary,
    UserProfile, UpdateUserProfileReq, Conversation
} from "../types.tsx";



export const API_URL = import.meta.env.VITE_API_URL  || 'http://localhost:8080';


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.request.use( request => {
    const token = sessionStorage.getItem("jwt")
    
    if(token) {
        request.headers['Authorization'] = token
    }
    return request;
},
    error => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        
        
        if(error.response.status === 403 && !originalRequest._retry) {
            
            originalRequest._retry = true;
            try {
                
                
                const response = await axios.get(`${API_URL}/api/${sessionStorage.getItem("user")}`)
                
                sessionStorage.removeItem("jwt")
                
                sessionStorage.setItem("jwt", response.headers.authorization)
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem("jwt")
                localStorage.removeItem("user")
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)



export async function getPosts(page: number): Promise<Pageable> {
    const response = await axiosInstance.get(`/api/posts?page=${page}`)
    return response.data.data.posts;
}


export async function getUserPosts(page: number, id: number): Promise<Pageable> {
    const response = await axiosInstance.get(`/api/posts/user/${id}?page=${page}`)

    return response.data.data.posts;
}

export async function getUserFollowingPosts(page: number): Promise<Pageable> {
    const response = await axiosInstance.get(`/api/posts/user/following?page=${page}`)
    return response.data.data.posts;
}

export async function getUserLikedPosts(page: number): Promise<Pageable> {
    const response = await axiosInstance.get(`/api/posts/likes?page=${page}`)
    
    return response.data.data.posts;
}

export async function getUserLikedPostsId(): Promise<number[]> {
    const response = await axiosInstance.get(`/api/posts/likes/ids`)
    return response.data.data.posts;
}



export async function likePost(id: number) {
    return axiosInstance.put(`/api/posts/${id}/like`).catch((error) => {
        console.error(error)
    });
}

export async function unlikePost(id: number) {
    return axiosInstance.put(`/api/posts/${id}/unlike`);
}

export async function deletePost(id: number)  {
    return await axiosInstance.delete(`/api/posts/${id}`);
}

export async function createNewPost(  post  : PostRequest): Promise<Post> {
    if(post.content === "") {
        throw new Error("Post content cannot be empty");
    }
    const response = await axiosInstance.post(`/api/posts`, post).catch((error) => {
        console.error(error)
    });
    return response?.data.data.post;
}

export async function updatePost( post : UpdatePostRequest) {
    if(post.content === "") {
        throw new Error("Post content cannot be empty");
    }

    return await axiosInstance.put(`/api/posts/${post.id}`, post)
}


export async function getAuthedUser(): Promise<User | void> {
    return await axiosInstance.get(`/api/users/me`).then((response) => {
        
        return response.data.data.user as User
    }).catch((error) => {
        console.error(error)
    });

}

export async function getUser(id: number): Promise<UserProfile | void> {
    return await axiosInstance.get(`/api/users/${id}`).then((response) => {
        
        return response.data.data.user as UserProfile
    }).catch((error) => {
        console.error(error)
    });
}
export async function followUser(followingId: number) {
    const response = axiosInstance.post(`/api/users/follow/${followingId}`)
    return response.then((response) => {
        return response.data
    }).catch((error) => {
        console.error(error)
    });
}


export async function unfollowUser(followingId: number) {
    const response = axiosInstance.delete(`/api/users/unfollow/${followingId}`)
    return response.then((response) => {
        return response.data
    }).catch((error) => {
        console.error(error)
    });
}

export async function getUserProfileImg(id: number) {
    return await axiosInstance.get(`/api/users/${id}/photo`).then(
        (response) => {
            return response.data
        }
    );
}

export async function setUserProfileImg(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const axiosConfig = () : AxiosRequestConfig => {
        return {
            headers: {
                'Content-Type': 'multipart/form data'
            }
        }
    }
    return await axiosInstance.post(`/api/users/photo`, formData, axiosConfig()).catch((error) => {
        console.error(error)
    });
}

export async function getFollowers(id: number): Promise<UserSummary[]> {
    return await axiosInstance.get(`/api/users/${id}/followers`).then((response) => {
        return response.data.data.followers
    }).catch((error) => {
        console.error(error)
    });
}

export async function getFollowing(id: number): Promise<UserSummary[]> {
    return await axiosInstance.get(`/api/users/${id}/following`).then((response) => {
        return response.data.data.following
    }).catch((error) => {
        console.error(error)
    });
}

 export function useGetFollowers(id: number) {
    return useQuery({
        queryKey: ["followers", id],
        queryFn: async () => await getFollowers(id),
    })
}
export function useGetFollowing(id: number) {
    return useQuery({
        queryKey: ["following", id],
        queryFn: async () => await getFollowing(id),
    })
}

export function useGetUserImage(id: number) {
    return useQuery({
        queryKey: ['photoUrl', id],
        queryFn: async () => await getUserProfileImg(id),
        staleTime: Infinity
    })
}



export async function updateProfile( profile : UpdateUserProfileReq) {
    return await axiosInstance.patch(`/api/users`, profile)
}


// Fetch chat messages between sender and recipient
export const fetchMessages = async (senderId: number, recipientId: number): Promise<Message[]> => {
    const response = await axiosInstance.get(`/api/chat/messages/${senderId}/${recipientId}`);
    
    return response.data;
};

// Fetch all conversations for a user with the last message from each conversation
export const fetchConversations = async (userId: number): Promise<Conversation[]> => {
    const response = await axiosInstance.get(`/api/chat/conversations/${userId}`);
    return response.data;
};

export const useConversations = (userId: number) => {
    return useQuery({
        queryKey: ['conversations', userId],
        queryFn: () => fetchConversations(userId),
    });
};

// Fetch user profile
export const getUserProfile = async (userId: number): Promise<UserProfile> => {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data.data.user;
};



export const useMessages = (senderId: number, recipientId: number) => {
    return useQuery({
        queryKey: ['messages', senderId, recipientId],
        queryFn: () => fetchMessages(senderId, recipientId),
    });
}

export const useUserProfile = (userId: number) => {
    return useQuery({
        queryKey: ['userProfile', userId],
        queryFn: () => getUserProfile(userId),
        staleTime: 1000 * 60 * 10, // Data is fresh for 10 minutes
    });
};

