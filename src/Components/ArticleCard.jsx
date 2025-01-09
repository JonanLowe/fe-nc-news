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
     <section className="article-card">
        <div id = "ac-main">
            <Link to={`/articles/${id}`}>
                <img src={img_url} id="ac-img"/>
            </Link>
            <div id = "ac-right">
              <Link to={`/articles/${id}`}>
              <div id= "ac-right-top">
                <p id= "article-title">{title}</p>
                <div id = "ac-right-info">
                  <p>author: {author}</p>
                  <p>posted: {displayDate}</p>
                  <p>comments: {comment_count}</p>
                  <p>votes: {vote_count}</p>
                </div>
              </div>
              </Link>
              <Link to={`/topics/${topic}`}>
              <div id="ac-right-link">
                <p>topic: {topic} </p>
              </div>
              </Link>
            </div>
        </div>
    </section>
    )


}