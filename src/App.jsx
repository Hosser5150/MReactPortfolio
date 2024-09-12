import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tech from './components/Tech'
import Report from './components/Report'

function App() {

  return (
    <>
    <div className="overflow-x-hidden overflow-y-visible text-neutral-200 antialiased selection:text-blue selection:bg-cyan">  
      <div className="fixed top-0 -z-10 h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar></Navbar>
        <Hero></Hero>
        <Tech></Tech>
        <Report></Report>
      </div>
    </div>
    </>
  );
}

export default App;
