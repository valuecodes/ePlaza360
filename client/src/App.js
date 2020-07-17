import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

export default function App() {
  return (        
    <BrowserRouter>
      <div className="gridContainer">
          <Header/>
          <main className='main'>

            <div className='content'>
              <Route path='/product/:id' component={ProductScreen}/>
              <Route path='/cart/:id?' component={CartScreen}/>
              <Route path='/' exact={true} component={HomeScreen}/>
            </div>
            
          </main>          
          <Footer/>
      </div>    
    </BrowserRouter>           

  )
}

