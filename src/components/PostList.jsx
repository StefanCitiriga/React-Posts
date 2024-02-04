import classes from "./PostList.module.css";
import Post from "./Post";
import NewPost from "./NewPost";
import { useState,useEffect } from "react";
import Modal from "./Modal";

const PostList = ({ isPosting, onStopPosting }) => {
  
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts(){
      setIsFetching(true);
      const response = await fetch('http://localhost:8080/posts');
      const responseData = await response.json()
      setPosts(responseData.posts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData){
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setPosts((prevState) => [postData, ...prevState]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler}/>
        </Modal>
      )}
      {!isFetching && posts.length > 0 && <ul className={classes.posts}>
        {posts.map((post) => <Post key={post.body} author={post.author} body={post.body}/>)}
      </ul>}
      {!isFetching && posts.length === 0 && <div style={{textAlign: 'center', color:'white'}}>
        <h2>There are no posts yet.</h2>
        <p>Start adding some :)</p>
        </div>}
      {isFetching && <div style={{textAlign: 'center', color:'white'}}>
        <p>Loading posts...</p>
        </div>}
    </>
  );
};

export default PostList;
