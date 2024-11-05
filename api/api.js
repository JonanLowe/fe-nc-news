import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-c2tj.onrender.com/api/",
});

export function getAllArticles() {
  return api.get("/articles").then(({ data }) => {
    console.log(data.articles);
    return data.articles;
  });
}
