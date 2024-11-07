import { useContext } from "react";
import UserContext from "../contexts/userContext.js"

export default function CommentCard(props){
    const {author, body} = props;
    const { user } = useContext(UserContext);

    return (
        <>
        <section className= "comment-card">
            <div>
            <p><b>Author: {author} </b></p>
            <p>{body}</p>
            </div>
            { author === user ? <button> delete comment</button>
             : null
            }
        </section>
        </>
    )
}