import axios, { AxiosRequestConfig } from "axios";
import { Post, PostRequest, UpdatePostRequest, User} from "../types.tsx";

export const API_URL = 'http://localhost:8080/api';

const getAxiosConfig = () : AxiosRequestConfig => {
    const token =  sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }
}

export async function getPosts(): Promise<Post[]> {
    const response = await axios.get(`${API_URL}/post/all`, getAxiosConfig())
    return response.data.data.posts;
}

export async function deletePost(id: number)  {
    return await axios.delete(`${API_URL}/post/delete/${id}`, getAxiosConfig());
}

export async function createNewPost(  post  : PostRequest) {
    if(post.content === "") {
        throw new Error("Post content cannot be empty");
    }
    return await axios.post(`${API_URL}/post/add`, post, getAxiosConfig())
}

export async function updatePost( post : UpdatePostRequest) {
    if(post.content === "") {
        throw new Error("Post content cannot be empty");
    }

    return await axios.patch(`${API_URL}/post/update`, post, getAxiosConfig())
}


export async function getAuthedUser(): Promise<User | undefined> {
    try {

        const {data} = await axios.get(`${API_URL}/user/authed-user`, getAxiosConfig())
        if (data.code == 200) {
            console.log(data.code)
            return data.data.user as User;
        } else {
            return undefined;
        }

    } catch (error) {
        console.log(error)
    }
}
