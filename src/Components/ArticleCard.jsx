import {Link} from "react-router-dom"

export default function ArticleCard(props){
    const {
        title,
        topic,
        id,
        author,
        created_at,
        vote_count,
        img_url,
        comment_count} = props;
    const splitDate =  created_at.split('T')
    const date =  splitDate[0].split('-')
    const displayDate = `${date[2]}/${date[1]}/${date[0]}`

    return (
        <Link to={`/articles/${id}`}>
        <section className="article-card">
            <div id = "ac-main">
                      <div id = "ac-img-container">
                            <img src={img_url} id="ac-img"/>
                    </div>
            <div id = "ac-right">
                <div id= "ac-right-top">
                <p id= "article-title">{title}</p>
                <Link to={`/topics/${topic}`}>
                <p id="card-link">topic: {topic} </p>
                </Link>
            </div>
            <div id = "ac-right-bottom">
            <p>author: {author}</p>
            <p>posted: {displayDate}</p>
            <p>comments: {comment_count}</p>
            <p>votes: {vote_count}</p>
            </div>
                </div>
            </div>



        </section>
                            </Link>
    )


}