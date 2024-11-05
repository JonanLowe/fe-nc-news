
import '../src/App.css'
import {Routes, Route} from 'react-router-dom'

import Header from '../Components/Header'
import Nav from '../Components/Nav'

import Home from '../Components/Home'
import Articles from '../Components/Articles'
import SingleArticle from '../Components/SingleArticle'


function App() {

  return (
    <>
    <div className = "sticky-top">
      <Header/>
      <Nav/>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/articles" element={<Articles/>}/>
      <Route path="/articles/:article_id" element={<SingleArticle/>}/>
    </Routes>
    </>
  )
}

export default App
