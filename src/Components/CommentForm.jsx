import { useContext, useState } from "react";
import { postCommentByArticleId } from "../api/api.js"
import UserContext from "../contexts/userContext.js"


export default function CommentForm(props){

    const {article_id, addComment} = props

    const { user } = useContext(UserContext);
    
    const [userName, setUserName] = useState(user);
    const [newComment, setNewComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [isError, setIsError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    function handleNewComment(id, username, newComment){
        setIsPosting(true)
        postCommentByArticleId(id, username, newComment)
        .then((response) => {
            setIsPosting(false)
            setNewComment("")
            addComment(response.returnedComment)
            }).catch((err)=> {
                setErrorMessage(err.message)
                setIsError(true)
            })          
        }

    if(isError){
        return ( <>
          <p>There was an Error posting your comment at this time </p>
          <p>Please refresh your page and try again</p>
          </>
      )
    }

    return (
    <section className = "comment-form" id= "new-comment-form">
        <textarea disabled = {isPosting}
            id= "new-comment-box"
            className = "comment-box"
            placeholder={`Comment as ${user}`}
            value={newComment}
            onChange ={({target: {value}}) => {setNewComment(value)}}
        />
        <div id = "comment-submit-section">
        <h3>All comments for this article:</h3>
        <button id="submit-comment" disabled = {newComment.length <1} onClick={() => {handleNewComment(article_id, userName, newComment)}}> {isPosting? "Posting..." : "Submit Comment" }</button>
        </div>
    </section> 
    )
}

