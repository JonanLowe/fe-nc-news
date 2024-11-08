import {Link} from "react-router-dom"

export default function ArticleCard(props){
    const {title, topic, id} = props
    return (
        <section className="article-card">
            <Link to={`/articles/${id}`}>
            <p>{title}</p>
            </Link>
            <Link to={`/topics/${topic}`}>
            <p>topic: {topic}</p>
            </Link>
        </section>
    )


}