import { useEffect, useState } from "react"
import { getArticlesAndSort } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";
import LoadingMessage from "./LoadingMessage.jsx"

export default function ArticlesList(props){
    
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    
    useEffect(()=>{
        setIsLoading(true);
        getArticlesAndSort().then((articles) => {
            setIsLoading(false);
            setArticles(articles)
        })    
        .catch((err) => {
            setIsError(true)
            setErrorMsg(err.message)})
    }, [])
    
    function generateRandom (max) {
        return Math.random() * (max)
    }

    const randomArticleNumber = Math.floor(generateRandom(articles.length))

    function createRandomArticleCard(articles, number) {
        return <>
        <li key = {articles[number].article_id}>
            <ArticleCard 
            title={articles[number].title}
            created_at={articles[number].created_at}
            topic={articles[number].topic}
            author={articles[number].author}
            id={articles[number].article_id}
            vote_count={articles[number].votes}
            img_url={articles[number].article_img_url}
            comment_count={articles[number].comment_count}
            />
        </li>
        </>}
    
    if (isError) {
    return <p>{errorMsg}</p>;
    }

    if (isLoading) {
        return <>
        <p>loading articles...</p>
        <LoadingMessage/>
        </>
    }

    return    (   
        <section id="all-articles-list">
            <ul className = "list-container" >
            <p>A random article from our selection:</p>
            {createRandomArticleCard(articles, randomArticleNumber)}
            </ul>
        </section>     
    )
}