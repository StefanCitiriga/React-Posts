import classes from "./PostList.module.css";
import Post from "./Post";
import NewPost from "./NewPost";

const PostList = () => {
  return (
    <>
      <NewPost />
      <ul className={classes.posts}>
        <Post message="React is awesome" author="Stefan" />
        <Post message="React is awesome" author="Stefan" />
        <Post message="React is awesome" author="Stefan" />
        <Post message="React is awesome" author="Stefan" />
      </ul>
    </>
  );
};

export default PostList;
