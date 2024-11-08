import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-c2tj.onrender.com/api/",
});

export function getAllArticles() {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
}

export function getAllTopics() {
  return api.get("/topics").then(({ data }) => {
    console.log(data);
    return data.topics;
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
    .patch(`/articles/${id}/`, { inc_votes: vote })
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return err;
    });
}

export function postCommentByArticleId(id, user, newComment) {
  return api
    .post(`/articles/${id}/comments`, { username: user, comment: newComment })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function deleteCommentById(id) {
  return api
    .delete(`/comments/${id}`, { comment_id: id })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getArticlesByTopicSlug(topic) {
  return api
    .get("/articles", {
      params: {
        topic: topic,
      },
    })
    .then(({data}) => {
    return data.articles;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
