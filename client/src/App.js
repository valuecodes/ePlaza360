import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import data from './data'
import Products from './components/Products'

export default function App() {
  return (                    
    <div className="gridContainer">
        <Header/>
        <main className='main'>
          <Products/>    

        </main>          
        <Footer/>
    </div>
  )
}

