import axios from "axios";
import { useParams } from "react-router-dom";

const api = axios.create({
  baseURL: "https://nc-news-c2tj.onrender.com/api/",
});

export function getAllArticles() {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
}

export function getSingleArticle(id) {
  return api.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}

export function getCommentsByArticleId(id) {
  return api.get(`/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
}

export function patchVoteCount(id, vote) {
  return api
    .patch(`/articles/${id}/`, { inc_votes: Number(vote) })
    .then(({ data }) => {
      console.log(data);
    });
}
