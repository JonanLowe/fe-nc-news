import ArticlesPage from "./ArticlesPage.jsx";
import {useParams} from 'react-router-dom';

export default function SingleTopic(){

const {topic_slug} = useParams();
   return (
    <ArticlesPage topic_slug={topic_slug}/>
   )
}

