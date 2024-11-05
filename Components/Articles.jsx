import { useEffect, useState } from "react"
import { getAllArticles } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";

export default function Articles(){
    const [articles, setArticles] = useState([]);

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        getAllArticles().then((allArticles) => {
            setIsLoading(false);
            setArticles(allArticles)
        })
    }, [])

    const articlesList = articles.map(article=>
        <li key={article.article_id}>
            <ArticleCard title={article.title} topic={article.topic} id={article.article_id}/>
        </li>);

    if (isLoading) {
        return <p>loading...</p>;
    }

    return    (   
        <div className = "list-container" id="all_articles_list">
            <h2>All articles:</h2>
            <ul className="articles-list">
                {articlesList}
            </ul>
        </div>
    )
}