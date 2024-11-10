import { useState } from "react"
import ArticlesList from "./ArticlesList.jsx"

import SortAndOrder from "./SortAndOrder.jsx";
import { useSearchParams } from 'react-router-dom';


export default function ArticlePage(props){

    const { topic_slug } = props;
    
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState(searchParams.get("sorted_by") || "created_at")
    const [orderBy, setOrderBy] = useState(searchParams.get("order") || "asc")

 return    (   
    <>
    <section className="articles-header">
    <h2>{topic_slug ? `All articles on ${topic_slug}`:"All articles"}</h2>
    <SortAndOrder
    setSortBy={setSortBy} 
    sortBy={sortBy} 
    setOrderBy={setOrderBy} 
    orderBy={orderBy}
    />
    </section>

    <section id="articles-list">
    <ArticlesList
    sortBy={sortBy} 
    setSortBy={setSortBy} 
    orderBy={orderBy}
    setOrderBy={setOrderBy} 
    setSearchParams={setSearchParams}
    topic_slug={topic_slug}
    />
    </section>

</>
)
}








