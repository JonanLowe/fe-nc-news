
import { Link } from "react-router-dom"

export default function Nav(){
    return (
    <header id="navbar" className = "nav">
            <Link to="/"> Home </Link>
            <Link to="/articles"> All Articles </Link>
    </header>
    )
} 