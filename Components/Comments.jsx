import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { getCommentsByArticleId } from "../api/api.js"
import CommentCard from "./CommentCard.jsx";

export default function fetchComments(){

    const {article_id} = useParams();
    console.log (article_id, "<<article_id")

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        getCommentsByArticleId(article_id).then((comments) => {
            setIsLoading(false);
            setComments(comments);
        })
    }, [])

    if (isLoading) {
        return <p>loading comments...</p>;
    }

    const commentsList = comments.map(comment=>
        <li key={comment.comment_id}>
            <CommentCard author = {comment.author} body = {comment.body}/>
        </li>);


    return    (   
        <div id="comments_list" className = "list-container" >
            <h3>All comments for this article:</h3>
            <ul>
            {commentsList}
            </ul>
        </div>
    )
}