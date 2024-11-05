import { useEffect, useState } from "react"
import { getSingleArticle } from "../api/api.js"
import {patchVoteCount} from "../api/api.js"

import Comments from '../Components/Comments.jsx'

import {useParams} from 'react-router-dom';

export default function SingleArticle(){

    const {article_id} = useParams();
    
    const [article, setArticle] = useState([]);
    const [votes, setVotes] = useState(0);
    const [currentVotes, setCurrentVotes] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        getSingleArticle(article_id).then((article) => {
            setIsLoading(false);
            setIsError(false);
            setArticle(article);
            setVotes(article.votes)
        })
        .catch((err)=>{
            setIsError(true)
            setErrorMsg(err.message)
        })
    }, [])

    // LOCAL /optimistic RENDERING: 
    function handleVote(id, vote){
            setVotes(votes + vote)
            patchVoteCount(id, vote)
    }

    // needs to send patch request to API for voting somehow

    
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
                <h3>{article.title}</h3>
                <div className = "article-properties">
                    <p>Author: {article.author}</p>
                    <p>Topic: {article.topic}</p>
                </div>
                <div id="article-body" className = "article-body">
                    <p>{article.body}</p>
                </div>
                <div className = "vote-display">
                    <p className = "vote-text">VOTES: {votes}</p>
                    <button id="increase-votes" className = "vote-button" onClick={() => handleVote(article_id, 1)}>VOTE +</button>
                    <button id="decrease-votes" className = "vote-button" onClick={() => handleVote(article.id, -1)}>VOTE -</button>
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