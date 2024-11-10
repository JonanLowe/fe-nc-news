import ArticlePage from "./ArticlePage.jsx";
import {useParams} from 'react-router-dom';

export default function SingleTopic(){

const {topic_slug} = useParams();

console.log("in single stopic - should just do article page")
    
   return (
    <ArticlePage topic_slug={topic_slug}/>
   )

}

