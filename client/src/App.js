import React from 'react'
import Header from './components/header'
import Footer from './components/footer'

export default function App() {
  return (                    
    <div className="gridContainer">
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

function Main(){

  return(
    <main className='main'>
      <div className="products">
        <li>
          <div className='product'>
            <img className='productImage' src='/images/d1.jpg'/>
            <div className='productName'>Slim Shirt</div>
            <div className='productBrand'>Nike</div>
            <div className='productPrice'>$50</div>            
          </div>
        </li>
      </div>
    </main>    
  )
}
