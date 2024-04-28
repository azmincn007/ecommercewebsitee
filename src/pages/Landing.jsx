import React from 'react'
import '../styles/Landing/landing.css'
import Hero from './Hero'
import Navbar from './Navbar'

function Landing() {
  return (
    <div className='landing'>
   <Hero/>
   <div className="navbarland">
   <Navbar/>
   </div>

    </div>
  )
}

export default Landing
