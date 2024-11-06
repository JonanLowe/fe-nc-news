import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { getCommentsByArticleId } from "../api/api.js"
import CommentCard from "./CommentCard.jsx";

export default function fetchComments(){

    const {article_id} = useParams();

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [newComment, setNewComment] = useState(false);

    // state: want to comment
    // conditionally renders a newComment form

    // new comment form: username (box), post (button)
    ////                    COMMENT

    // optimistically renders on submit (commentList.push       
    //  <li key={comment.comment_id}>
            // <CommentCard author = {comment.author} body = {comment.body}/>
            // </li>);)- form disappears, comment added to list

    // then post request.

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


    return    (   
        <div id="comments_list">
            <div class = "comment-header">
            <h3 >All comments for this article:</h3>
            <button onClick={()=>{setNewComment(!newComment)}}> New Comment</button>
            </div>
            {newComment? 
            <form class = "comment-form" id="new-comment-form">
                <textarea placeholder="Username" class = "username-box" name= "username" id= "username-comment-box"/>
                <textarea placeholder="Comment" class = "comment-box" name= "newcomment" id= "new-comment-box"/>
                <button id="submit-comment" >Submit Comment</button>
            </form> 
            : null
            }
            <ul>
            {commentsList}
            </ul>
        </div>
    )
}