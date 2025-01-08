import { useEffect, useState } from "react"
import { getSingleArticle } from "../api/api.js"
import { patchVoteCount } from "../api/api.js"

import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { BsHandThumbsDownFill } from "react-icons/bs";

import Comments from './Comments.jsx'

import {useParams} from 'react-router-dom';

export default function SingleArticle(){

    const {article_id} = useParams();       
    const [article, setArticle] = useState({});
    const [localVotes, setLocalVotes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isVoteError, setIsVoteError] = useState(false);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        getSingleArticle(article_id).then((article) => {
            setIsLoading(false);
            setArticle(article);
            setLocalVotes(article.votes)
        })
        .catch((err)=>{
            setIsError(true)
            setErrorMsg(`Article not found`)
        })
    }, [article_id])

    function handleVote(id, vote){
        setLocalVotes(localVotes + vote)
        patchVoteCount(id, vote).then(() => {
            setIsVoteError(false)
            })
        .catch(()=>
            {setLocalVotes(article.votes)
            setIsVoteError(true)
            })
    }

    function UpvoteButton(){
        return  <button id="increase-vote" disabled= {isVoteError || hasDownvoted} className = "vote-button" onClick={() => {handleVote(article_id, 1); setHasUpvoted(true); setHasDownvoted(false)}}><BsHandThumbsUp /></button>
    }

    function CancelUpvoteButton(){
        return  <button id="cancel-increase-vote" disabled= {isVoteError} className = "vote-button-clicked" onClick={() => {handleVote(article_id, -1); setHasUpvoted(false); setHasDownvoted(false)}}><BsHandThumbsUpFill /></button>
    }
    
    function DownvoteButton(){
        return  <button id="decrease-votes" disabled= {isVoteError || hasUpvoted} className = "vote-button" onClick={() => {handleVote(article_id, -1); setHasDownvoted(true); setHasUpvoted(false)}}><BsHandThumbsDown /></button>
    }

    function CancelDownvoteButton(){
        return  <button id="cancel-decrease-votes" disabled= {isVoteError} className = "vote-button-clicked" onClick={() => {handleVote(article_id, 1); setHasDownvoted(false); setHasUpvoted(false)}}><BsHandThumbsDownFill /></button>
    }
    
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
            <div id = "article-properties">
                <h3>{article.title}</h3>
                    <p>Author: {article.author}</p>
                    <p>Topic: {article.topic}</p>
                </div>
                <img id = "article-header-image" src = {article.article_img_url}/>
        </div>

        <div id="article-body">
            <p>{article.body}</p>
        </div>

            <div className = "vote-display">
                <p className = "vote-text"> {isVoteError ? "Sorry - there is an error with voting, please refresh your page" :`VOTES: ${localVotes}`}</p>
                {hasUpvoted?  <CancelUpvoteButton/> : <UpvoteButton/> }
                {hasDownvoted?  <CancelDownvoteButton/> : <DownvoteButton/> }
            </div>

        <div>
            <Comments article_id={article_id}/>
        </div>
     </> 
    )
}

