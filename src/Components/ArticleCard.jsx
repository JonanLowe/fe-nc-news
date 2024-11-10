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
            <div id = "ac-top">

                      <div id = "ac-top-left">
                            <Link to={`/articles/${id}`}>
                            <img src={img_url} width="240vh"/>
                            </Link>
                    </div>
                <div id = "ac-top-right">   
            <Link to={`/articles/${id}`}>
                <p>{title}</p>
            </Link>
                <Link to={`/topics/${topic}`}>
                <p id="card-link">explore {topic} </p>
                </Link>
            <div id = "ac-bottom">
            <p>{author}</p>
            <p>{displayDate}</p>
            <p>{comment_count}</p>
            <p>{vote_count}</p>
            </div>
                </div>
            </div>



        </section>
    )


}