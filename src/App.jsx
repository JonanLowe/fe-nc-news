
import './App.css'
import { useState } from 'react';

import Header from './Components/Header'
import Nav from './Components/Nav'
import RoutesComponent from './Components/RoutesComponent'

import UserContext from "./contexts/userContext.js";

function App() {

  const [user, setUser] = useState("grumpy19")
  
  return (
    <UserContext.Provider value ={{ user, setUser}}>
    <main >
      <section className = "top">
        <Header/>
        <Nav/>
      </section>
      <section className = "content">
        <RoutesComponent/>
      </section>
    </main>
  </UserContext.Provider>
  )
}

export default App
