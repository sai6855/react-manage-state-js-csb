import { useCallback, useContext } from "react";
import * as api from "../api/index.js";
import { Context } from "../Store/Context.js";

const useApi = () => {
  const { setState } = useContext(Context);

  const getPosts = useCallback(async () => {
    try {
      const data = await api.fetchPosts();

      setState(() => data, "store.posts");
    } catch (error) {
      console.log(error.message);
    }
  }, [setState]);

  const createPost = async (post) => {
    try {
      const data = await api.createPost(post);
      console.log("create post");
      setState((posts) => {
        return [...posts, data];
      }, "store.posts");
    } catch (error) {
      console.log(error.message);
    }
  };

  const updatePost = async (id, newpost) => {
    try {
      const data = await api.updatePost(id, newpost);
      console.log("update post");
      setState(
        (store) => ({
          ...store,
          posts: store.posts.map((post) =>
            post._id === id ? { ...data, ...newpost } : post
          ),
          currentId: 0,
        }),
        "store"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const likePost = async (id) => {
    console.log("like post");
    try {
      const data = await api.likePost(id);

      setState(
        (posts) => posts.map((post) => (post._id === id ? data : post)),
        "store.posts"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePost = async (id) => {
    console.log("delete post");
    try {
      await api.deletePost(id);

      setState((state) => {
        return {
          ...state,
          currentId: 0,
          posts: state.posts.filter((post) => post._id !== id),
        };
      }, "store");
    } catch (error) {
      console.log(error.message);
    }
  };

  return { deletePost, getPosts, updatePost, createPost, likePost };
};

export default useApi;
