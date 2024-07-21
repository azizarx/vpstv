import { useState } from 'react'
import UrlInput from './components/UrlInput'
import { ShowCard } from './components/Card'
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<UrlInput />} />
        <Route path="/show" element={<ShowCard />} />

    </Routes>
      </>
  )
}

export default App
