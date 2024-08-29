import {z} from "zod"
import {useEffect, useState} from "react";

export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number(),
})

export type Post = z.infer<typeof PostSchema>;
export const PostList = z.array(PostSchema);
export type PostList = z.infer<typeof PostList>


export const FetchPostListSchema = z.object({
    list: PostList,
})

export type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList(): Promise<FetchPostListResponse> {
    return fetch("/api/posts")
        .then((response) => response.json())
        .then((data) => FetchPostListSchema.parse(data))
}

interface IdleRequestState {
    status: "idle";
}

interface LoadingRequestState {
    status: 'pending';
}

interface SuccessRequestState {
    status: "success";
    data: PostList;
}

interface ErrorRequestState {
    status: "error";
    error: unknown;
}

type RequestState =
    | IdleRequestState
    | LoadingRequestState
    | SuccessRequestState
    | ErrorRequestState


export function usePostList() {
    const [state, setState] = useState<RequestState>({status: "idle"});

    useEffect(() => {
        if ({status: "success"}) {
            fetchPostList().then((data) => {
                setState({status: "success", data: data.list});
            }).catch((error) => {
                setState({status: "error", error});
            });
        }
    }, [state]);

    useEffect(() => {
        setState({status: "pending"})
    }, [])
    const refetch = () => {
        setState({status: "pending"})
    }
    return {
        state,
        refetch,
    }

}


//
// export interface Post {
//     /**
//      * ID Posta
//      */
//     id: string;
//     text: string;
//     authorId: string;
//     createdAt: number;
// }
// export type PostList = Post[];