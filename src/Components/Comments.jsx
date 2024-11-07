import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { getCommentsByArticleId } from "../api/api.js"

import CommentCard from "./CommentCard.jsx";
import CommentForm from "./CommentForm.jsx"

export default function fetchComments(){

    const {article_id} = useParams();

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    function addComment(newComment){
        setComments(currentComments => {
            return [newComment, ...currentComments]
        })
    }

    useEffect(()=>{
        setIsLoading(true);
        getCommentsByArticleId(article_id).then((comments) => {
            setIsLoading(false);
            setComments(comments);
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
        return <p>loading comments...</p>;
    }

    const commentsList = comments.map(comment=>
        <li key={comment.comment_id}>
            <CommentCard author = {comment.author} body = {comment.body}/>
        </li>);

    return  (   
        <div id="comments_list">
            <div className = "comment-header">
            </div>
            <CommentForm article_id = {article_id} addComment={addComment}/>
            <ul>
            {commentsList}
            </ul>
        </div>
    )
}