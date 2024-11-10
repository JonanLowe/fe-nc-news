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

    // check error handling here ??
  
    
    function UpvoteButton(){
        return  <button id="increase-vote" disabled= {isVoteError || hasUpvoted} className = "vote-button" onClick={() => {handleVote(article_id, 1); setHasUpvoted(true); setHasDownvoted(false)}}>VOTE +</button>
    }
    
    function DownvoteButton(){
        return  <button id="decrease-votes" disabled= {isVoteError || hasDownvoted} className = "vote-button" onClick={() => {handleVote(article_id, -1); setHasDownvoted(true); setHasUpvoted(false)}}>VOTE -</button>
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
                    <UpvoteButton/>
                    <DownvoteButton/>
                </div>

        <div id="comments-list" className = "list-container">
            <div>
                <Comments article_id={article_id}/>
            </div>
        </div>
     </>
    
    )
}

