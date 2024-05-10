import axios, {AxiosRequestConfig} from "axios";
import {Post, PostRequest} from "../types.tsx";

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
    return response.data;
}

export async function createNewPost(  post  : PostRequest) {
    return await axios.post(`${API_URL}/post`, post, getAxiosConfig());
}

