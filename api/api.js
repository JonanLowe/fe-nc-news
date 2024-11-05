import axios from "axios";

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
