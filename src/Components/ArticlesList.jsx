import { useEffect, useState } from "react"
import { getArticlesAndSort } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";

export default function ArticlesList(props){
    
    const { topic_slug, sortBy, orderBy, setSearchParams} = props;

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    
    useEffect(()=>{
        setIsLoading(true);
        getArticlesAndSort(topic_slug, sortBy, orderBy).then((articles) => {
            setIsLoading(false);
            setArticles(articles)   
            setSearchParams(`sorted_by=${sortBy}&order=${orderBy}`)    
        })
        .catch((err) => {
            setIsError(true)
            setErrorMsg(`Sorry - we don't have any articles on ${topic_slug}, use 'Browse Topics' to see a list of available options`)})
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

    if (isError) {
        return <p>{errorMsg}</p>;
    }

    if (isLoading) {
        return <>
        <p>loading articles...</p>
        <p>Please note that on the first visit this may take up to 1 minute.</p>
        <p>This is a portfolio project created as part of Northcoders bootcamp.</p>
        <p>The back end is hosted via free licenses on Supabase and Render, and winds down between uses.</p>
        </>
    }

    return    (   
        <section id="all-articles-list">
            <ul className = "list-container" >
            {articlesList}
            </ul>
        </section>     
    )
}