import {useQuery} from '@tanstack/react-query';
import {fetchPostList} from "../../api/Post.ts";
import {Loader} from "../Loader";
import {PostListView} from "./PostListView.tsx";
import {queryClient} from "../../api/queryClient.ts";

export const FetchPostListView = () => {
    // const {state, refetch} = usePostList();
    const postListQuery = useQuery({
            queryFn: () => fetchPostList(),
            queryKey: ["posts"],
        },
        queryClient
    )

    switch (postListQuery.status) {
        // case "idle":
        case "pending":
            return <Loader/>

        case "success":
            return <PostListView postList={postListQuery.data.list}/>;

        case "error":
            return <div>
                <span>Error ;)</span>
                <button onClick={() => postListQuery.refetch()}>try again</button>
            </div>
    }
};