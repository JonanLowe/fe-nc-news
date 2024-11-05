import { useEffect, useState } from "react"
import { getSingleArticle } from "../api/api.js"

import Comments from '../Components/Comments.jsx'

import {useParams} from 'react-router-dom';

export default function SingleArticle(){
    const {article_id} = useParams();
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        getSingleArticle(article_id).then((article) => {
            setIsLoading(false);
            setIsError(false);
            setArticle(article)
        })
        .catch((err)=>{
            setIsError(true)
            setErrorMsg(err.message)
        })
    }, [])

    
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
        <>
        <div id="article-display" className = "single-article">
            <div>
                <h3>{article.title}</h3>
                <div className = "article-properties">
                    <p>Author: {article.author}</p>
                    <p>Topic: {article.topic}</p>
                </div>
                <div id="article-body" className = "article-body">
                    <p>{article.body}</p>
                </div>
            </div>
        </div>
        <div id="comments-list" className = "list-container">
            <div>
                <Comments article_id={article_id}/>
            </div>
        </div>
     </>
    
    )
}