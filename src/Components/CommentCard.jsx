import { useContext, useState } from "react";
import { deleteCommentById } from "../api/api.js"
import UserContext from "../contexts/userContext.js"

export default function CommentCard(props){
    const {author, body, id, removeComment} = props;
    const { user } = useContext(UserContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isError, setIsError] = useState(false)

    function handleDelete (id){
        setIsDeleting(true);
        deleteCommentById(id)
        .then((response) => {
            if (response.status === 204){
                removeComment(id)
            }
            else {
                setIsError(true)
            }
        }
    )}

    if (isError) {
        return <section className = "comment-card">
        <p>There has been an error displaying this comment</p>
        <p>Please refresh your page</p>
        </ section>
    }

    return (
        <section className= "comment-card">
            <div id="comment-info">
            <p><b>Author: {author} </b></p>
            <p>{body}</p>
            </div>

            <div id="delete-comment-button-container">

            { author === user ? <button id="delete-comment-button" disabled = {isDeleting} onClick= {()=>{handleDelete(id)}}> {isDeleting ? "Deleting...." : "Delete Comment"} </button>
             : null
            }
            </div>
        </section>

    )
}