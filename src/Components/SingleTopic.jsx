import { useEffect, useState } from "react"
import { getArticlesByTopicSlug } from "../api/api.js"
import ArticleCard from "./ArticleCard.jsx";

import {useParams} from 'react-router-dom';

export default function SingleTopic(){

    const {slug} = useParams();    
    
    const [articlesByTopic, setArticlesByTopic] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        getArticlesByTopicSlug(slug).then((articles) => {
            setIsLoading(false);
            setArticlesByTopic(articles);
        })
    }, [])
    

    const articlesList = articlesByTopic.map(article=>
        <li key={article.article_id}>
            <ArticleCard title={article.title} topic={article.topic} id={article.article_id}/>
        </li>);
    
    if (isError) {
        return <>
        <p>{errorMsg}</p>
        </>
    }

    if (isLoading) {
        return <>
        <p>loading...</p>
        </>
    }
    
    return    (   
        <div id="articles_list" className = "list-container" >
            <h2>All articles about {`${slug}`}:</h2>
            <ul>
            {articlesList}
            </ul>
        </div>
    )
}

