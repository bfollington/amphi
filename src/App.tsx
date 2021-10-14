import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import CollectionList from './CollectionList'
import ArenaContentItem from './ArenaBlock'

interface AppProps {}

function App({}: AppProps) {
  const [collection, setCollection] = useState('soundtrack-to-my-life')

  return (
    <div className="App">
      <ArenaContentItem id="13434578" />
      <select onChange={(e) => setCollection(e.target.value)}>
        <option value="soundtrack-to-my-life">soundtrack-to-my-life</option>
        <option value="wow-rw4ams2g0tq">wow-rw4ams2g0tq</option>
        <option value="pixels-rgcrxrag5wi">pixels-rgcrxrag5wi</option>
      </select>
      <CollectionList id={collection} />
    </div>
  )
}

export default App
