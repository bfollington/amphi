import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import CollectionList from './CollectionList'
import ArenaContentItem from './ArenaBlock'
import { styled } from '@stitches/react'
import { chooseFrom } from './array'
import github from './assets/GitHub-Mark-32px.png'

interface AppProps {}

const Toolbar = styled('div', {
  textAlign: 'left',
  padding: '8px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '32px',
  display: 'flex',

  justifyContent: 'space-between',
})

const initialCollections = [
  'pixels-rgcrxrag5wi',
  'ui-hppcfhx_xyi',
  'wow-rw4ams2g0tq',
  'generative-inspo',
  'sci-fi-garden',
  'cyberpunk-zqoewae0qp8',
  'fantasy-fvi_ezooajc',
  'melancholy-m0xf7v4gvzm',
  'japan-wwtzlgipuso',
  'city-hec7ay_fyr0',
  'surreal-rlgxe03_dtu',
  'worlds-mlh7zp-nyeu',
  'industrial-mtzcq5xkosu',
  'solarpunk-3e3qwrnktcq',
  'famicase-dx3k-8ctcwk',
]
const allCollections = [...initialCollections, 'soundtrack-to-my-life']

function App({}: AppProps) {
  // Obviously will want this to be configurable later
  const [collection, setCollection] = useState(
    chooseFrom(initialCollections) ?? initialCollections[0],
  )

  return (
    <div className="App">
      {/* <ArenaContentItem id="13434578" /> */}
      <CollectionList id={collection} />
      <Toolbar>
        <a href="https://www.are.na/ben-follington">
          <img
            src="https://dev.are.na/assets/arena-mark-a778d5c8fca2b357f25a704124ac568d2c22bc994936c857623d61ac17596e91.svg"
            width={32}
            height={32}
          />
        </a>
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          {allCollections.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <a href="https://github.com/bfollington/amphi">
          <img width={32} height={32} src={github} />
        </a>
      </Toolbar>
    </div>
  )
}

export default App
