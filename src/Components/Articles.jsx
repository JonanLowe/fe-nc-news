import { useEffect, useState } from "react"
import { getArticlesAndSort } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";

export default function Articles(){
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        setIsLoading(true);
        getArticlesAndSort().then((allArticles) => {
            setIsLoading(false);
            setArticles(allArticles)
        })
    }, [])

    const articlesList = articles.map(article=>
        <li key={article.article_id}>
            <ArticleCard title={article.title} topic={article.topic} id={article.article_id}/>
        </li>);

    if (isLoading) {
        return <p>loading all articles...</p>;
    }

    return    (   
        <div id="all_articles_list" className = "list-container" >
            <h2>All articles:</h2>
            <ul>
            {articlesList}
            </ul>
        </div>
    )
}