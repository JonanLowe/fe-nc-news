import { useEffect, useState } from "react"
import { getArticlesAndSort } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";

export default function ArticlesList(props){
    
    const { topic_slug, sortBy, orderBy, setSearchParams} = props;

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        setIsLoading(true);
        getArticlesAndSort(topic_slug, sortBy, orderBy).then((articles) => {
            setIsLoading(false);
            setArticles(articles)   
            setSearchParams(`sorted_by=${sortBy}&order=${orderBy}`)    
        })
        .catch((err) => {console.log(err)})
    }, [topic_slug, sortBy, orderBy])

    
    const articlesList = articles.map(article=>
        <li key = {article.article_id}>
            <ArticleCard 
            title={article.title}
            created_at={article.created_at}
            topic={article.topic}
            author={article.author}
            id={article.article_id}
            vote_count={article.votes}
            img_url={article.article_img_url}
            comment_count={article.comment_count}
            />
        </li>); 

    if (isLoading) {
        return <p>loading all articles...</p>;
    }

    return    (   
        <section id="all_articles_list">
            <ul className = "list-container" >
            {articlesList}
            </ul>
        </section>     
    )
}