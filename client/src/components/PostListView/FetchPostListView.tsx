import {usePostList} from "../../api/Post.ts";
import {Loader} from "../Loader";
import {PostListView} from "./PostListView.tsx";

export const FetchPostListView = () => {
    const { state, refetch } = usePostList();

    switch(state.status) {
        case "idle":
        case "pending":
            return <Loader />

        case "success":
            return <PostListView postList={state.data}/>;

        case "error":
            return <div>
                <span>Error ;)</span>
                <button onClick={refetch}>try again </button>
            </div>
    }
};