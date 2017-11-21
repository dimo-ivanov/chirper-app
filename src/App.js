import React, { Component } from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Navbar from './components/common/Navbar'
import Routes from './components/common/routes/Routes'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Navbar />
        <Routes />
        <Footer />
      </div>
    )
  }
}

export default App
