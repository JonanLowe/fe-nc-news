import { useEffect, useState } from "react"
import { getAllTopics } from "../api/api.js"
import TopicCard from "./TopicCard.jsx"

export default function Articles(){
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        getAllTopics().then((allTopics) => {
            setIsLoading(false);
            setTopics(allTopics);
        }).catch((err) => setIsError(true))
    }, [])

    const topicsList = topics.map(topic=>
        <li key={topic.slug}>
            <TopicCard slug={topic.slug} description={topic.description}/>
        </li>);

    if (isError) {
        return <p>ERROR</p>;
    }

    if (isLoading) {
        return <>
        <p>loading topics...</p>
        <p>Please note that on the first visit this may take up to 1 minute.</p>
        <p>This is a portfolio project created as part of Northcoders bootcamp.</p>
        <p>The back end is hosted via free licenses on Supabase and Render, and winds down between uses.</p>
        </>
    }

    return    (   
        <div >
            <h2>All topics:</h2>
            <ul className = "list-container" >
            {topicsList}
            </ul>
        </div>
    )
}