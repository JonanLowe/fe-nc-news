import Articles from "./Articles.jsx";

import {useParams} from 'react-router-dom';

export default function SingleTopic(){

const {topic_slug} = useParams();
    
   return (
    <Articles topic_slug={topic_slug}/>
   )

}

