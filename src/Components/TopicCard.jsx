import {Link} from "react-router-dom"

export default function TopicCard(props){
    //topic slug:
    console.log(props, "props")
    const {slug, description} = props
    return (
        <section className="article-card">
            <Link to={`/topics/${slug}`}>
            <p>{slug}</p>
            </Link>
            <p>{description}</p>
        </section>
    )


}