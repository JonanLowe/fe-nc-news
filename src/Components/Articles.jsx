import { useEffect, useState } from "react"
import { getArticlesAndSort } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";
import SortAndOrder from "./SortAndOrder.jsx";


export default function Articles(props){
    
    const { topic_slug } = props;
  
    const [topic, setTopic] = useState(topic_slug);
    const [sortBy, setSortBy] = useState("created_at")
    const [orderBy, setOrderBy] = useState("asc")

    
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        setIsLoading(true);
        getArticlesAndSort(topic, sortBy, orderBy).then((articles) => {
            setIsLoading(false);
            setArticles(articles)
        })
    }, [topic, sortBy, orderBy])
    
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
        <>
        <section className="articles-header">
        <h2>{topic_slug ? `All articles on ${topic_slug}`:"All articles"}</h2>
        <SortAndOrder
        setSortBy={setSortBy} 
        sortBy={sortBy} 
        setOrderBy={setOrderBy} 
        orderBy={orderBy}
        />
        </section>

        <div id="all_articles_list">
            <ul className = "list-container" >
            {articlesList}
            </ul>
        </div>     
</>
    )
}