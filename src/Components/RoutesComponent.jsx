import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Topics from './Topics.jsx'
import SingleArticle from './SingleArticle'
import SingleTopic from './SingleTopic.jsx';
import ArticlePage from './ArticlesPage.jsx';
import ErrorPage from './ErrorPage.jsx'

function RoutesComponent() {

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/articles" element={<ArticlePage topic_slug={null}/>}/>
        <Route path="/topics" element={<Topics/>}/>
        <Route path="/topics/:topic_slug" element={<SingleTopic/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
        <Route path="/*" element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RoutesComponent
