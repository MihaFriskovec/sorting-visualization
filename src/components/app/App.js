import React from 'react'
import './App.css'
import Header from '../header/Header'
import Visualizer from '../visualizer/Visualizer'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Visualizer></Visualizer>
      </div>
    )
  }
}

export default App
