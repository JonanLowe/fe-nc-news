export default function CommentCard(props){
    const {author, body} = props;
    return (
        <section className="comment-card">
            <p><b>Author: {author} </b></p>
            <p>{body}</p>
        </section>
    )
}