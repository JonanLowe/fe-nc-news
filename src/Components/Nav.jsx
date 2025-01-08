
import { Link } from "react-router-dom"

export default function Nav(){
    return (
    <section id="navbar" className = "nav">
        <section className = "links" id="header-text">
            <Link to="/"> Home </Link>
            <Link to="/topics"> Browse Topics </Link>
            <Link to="/articles"> All Articles </Link>
        </section>
    </section>
    )
} 