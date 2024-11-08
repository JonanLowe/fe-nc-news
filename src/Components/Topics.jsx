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
        return <p>loading all topics...</p>;
    }

    return    (   
        <div className = "list-container" >
            <h2>All topics:</h2>
            <ul>
            {topicsList}
            </ul>
        </div>
    )
}