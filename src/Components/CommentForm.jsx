import { useContext, useState } from "react";
import { postCommentByArticleId } from "../api/api.js"
import UserContext from "../contexts/userContext.js"


export default function CommentForm(props){

    const {article_id, addComment} = props

    const { user } = useContext(UserContext);
    
    const [userName, setUserName] = useState(user);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    function handleNewComment(id, username, newComment){
        setIsLoading(true)
        postCommentByArticleId(id, username, newComment)
        .then((response) => {
            setIsLoading(false)
            setNewComment("")
            if (response.returnedComment){
                addComment(response.returnedComment)
            }
            if(response.message){
                setErrorMessage(response.response.data.msg)
                setIsError(true)
            }
        })
    }

    if(isError){
        return ( <>
          <p>There was an Error posting your comment at this time </p>
          <p>{errorMessage} </p>
          <p>Please refresh your page and try again</p>
          </>
      )
    }

    if(isLoading){
        return ( <div id="posting-box">
            Posting ... 
            </div >
        )
    }

    return (
    <section className = "comment-form" id= "new-comment-form">
        <textarea
            id= "new-comment-box"
            className = "comment-box"
            placeholder={`Comment as ${user}`}
            value={newComment}
            onChange ={({target: {value}}) => {setNewComment(value)}}
        />
        <div id = "comment-submit-section">
        <h3>All comments for this article:</h3>
        <button id="submit-comment" onClick={() => {handleNewComment(article_id, userName, newComment)}}> Submit Comment </button>
        </div>
    </section> 
    )
}

