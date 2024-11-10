import {Link} from "react-router-dom"

export default function TopicCard(props){
    const {slug, description} = props
    return (
        <section className="topic-card">
            <Link to={`/topics/${slug}`}>
            <p>{slug}</p>
            </Link>
            <p>{description}</p>
        </section>
    )


}