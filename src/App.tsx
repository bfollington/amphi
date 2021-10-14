import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import CollectionList from './CollectionList'
import ArenaContentItem from './ArenaBlock'
import { styled } from '@stitches/react'
import { chooseFrom } from './array'

interface AppProps {}

const Toolbar = styled('div', {
  textAlign: 'left',
  padding: '8px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '32px',
})

function App({}: AppProps) {
  const [collection, setCollection] = useState(
    chooseFrom(['pixels-rgcrxrag5wi', 'ui-hppcfhx_xyi', 'wow-rw4ams2g0tq']),
  )

  return (
    <div className="App">
      {/* <ArenaContentItem id="13434578" /> */}
      <CollectionList id={collection} />
      <Toolbar>
        <img
          src="https://dev.are.na/assets/arena-mark-a778d5c8fca2b357f25a704124ac568d2c22bc994936c857623d61ac17596e91.svg"
          width={32}
          height={32}
        />
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          <option value="soundtrack-to-my-life">soundtrack-to-my-life</option>
          <option value="wow-rw4ams2g0tq">wow-rw4ams2g0tq</option>
          <option value="pixels-rgcrxrag5wi">pixels-rgcrxrag5wi</option>
          <option value="three-dee-jzsij8qmbvo">three-dee-jzsij8qmbvo</option>
          <option value="ui-hppcfhx_xyi">ui-hppcfhx_xyi</option>
        </select>
      </Toolbar>
    </div>
  )
}

export default App
