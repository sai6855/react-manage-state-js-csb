import { nanoid } from "nanoid";

export const fetchPosts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = localStorage.getItem("posts");
      resolve(posts ? JSON.parse(posts) : []);
    }, 1000);
  });
export const createPost = (newPost) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const prevPosts = localStorage.getItem("posts")
        ? JSON.parse(localStorage.getItem("posts"))
        : [];
      const modNewPost = { ...newPost, likeCount: 0, _id: nanoid() };
      localStorage.setItem("posts", JSON.stringify([...prevPosts, modNewPost]));
      resolve(modNewPost);
    }, 1000);
  });
export const likePost = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const prevPosts = JSON.parse(localStorage.getItem("posts"));

      const newPosts = prevPosts.map((post) =>
        post._id === id ? { ...post, likeCount: post.likeCount + 1 } : post
      );

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts.find((post) => post._id === id));
    }, 1000);
  });
export const updatePost = (id, updatedPost) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const prevPosts = JSON.parse(localStorage.getItem("posts"));

      const newPosts = prevPosts.map((post) =>
        post._id === id ? updatedPost : post
      );

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts);
    }, 1000);
  });
export const deletePost = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const prevPosts = JSON.parse(localStorage.getItem("posts"));

      const newPosts = prevPosts.filter((post) => post._id !== id);

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts);
    }, 1000);
  });
