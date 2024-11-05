import {Link} from "react-router-dom"

export default function ArticleCard(props){
    const {title, topic} = props
    return (
        <section className="article-card">
            <p>{title}</p>
            <p>{topic}</p>
        </section>
    )


}