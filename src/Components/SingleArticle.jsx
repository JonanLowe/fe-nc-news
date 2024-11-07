import { useEffect, useState } from "react"
import { getSingleArticle } from "../api/api.js"
import { patchVoteCount } from "../api/api.js"

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
            setErrorMsg(err.message)
        })
    }, [article_id])

    function handleVote(id, vote){
            setLocalVotes(localVotes + vote)
            patchVoteCount(id, vote).then((response) => {

            if (response.votes){
            setIsVoteError(false)
            }
            if(response.message){
            setLocalVotes(article.votes)
            setIsVoteError(true)
            }
            })
    }
  
    
    function UpvoteButton(){
        return  <button id="increase-vote" disabled= {isVoteError} className = "vote-button" onClick={() => {handleVote(article_id, 1); setHasUpvoted(true)}}>VOTE +</button>
    }
    
    function WithdrawUpvoteButton(){
        return  <button id="withdraw-upvote" disabled= {isVoteError} className = "pressed-vote-button" onClick={() => {handleVote(article_id, -1); setHasUpvoted(false)}}>Cancel Vote</button>
    }
    
    function DownvoteButton(){
        return  <button id="decrease-votes" disabled= {isVoteError} className = "vote-button" onClick={() => {handleVote(article_id, -1); setHasDownvoted(true)}}>VOTE -</button>
    }
    
    function WithdrawDownvoteButton(){
        return  <button id="withdraw-downvote" disabled= {isVoteError} className = "pressed-vote-button" onClick={() => {handleVote(article_id, 1); setHasDownvoted(false)}}>Cancel Vote</button>
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
                <h3>{article.title}</h3>
                <div className = "article-properties">
                    <p>Author: {article.author}</p>
                    <p>Topic: {article.topic}</p>
                </div>
                <div id="article-body" className = "article-body">
                    <p>{article.body}</p>
                </div>
                <div className = "vote-display">
                    <p className = "vote-text"> {isVoteError ? "Sorry - there is an error with voting, please refresh your page" :`VOTES: ${localVotes}`}</p>
                    {hasUpvoted ? <WithdrawUpvoteButton/> : <UpvoteButton/>}
                    {hasDownvoted ? <WithdrawDownvoteButton/> : <DownvoteButton/>}
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