import './PostView.css';
import { Post } from "../../api/Post.ts";
import { FC } from "react";

// временная метка тип number и возвращает человекочитаемый формат string
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

export interface PostListViewProps {
    post: Post;
}
export const PostView: FC<PostListViewProps> = ({ post }) => {
  return (
    <div className="post-view">
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
