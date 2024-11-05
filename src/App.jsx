
import '../src/App.css'
import {Routes, Route} from 'react-router-dom'

import Header from '../Components/Header'
import Articles from '../Components/Articles'
import Home from '../Components/Home'


function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/articles" element={<Articles/>}/>
    </Routes>
    </>
  )
}

export default App
