import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductsScreen from './screens/ProductsScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrdersScreen from './screens/OrdersScreen'

export default function App() {
  return (        
    <BrowserRouter>
      <div className="gridContainer">
          <Header/>
          <main className='main'>

            <div className='content'>
              <Route path='/orders' component={OrdersScreen}/>
              <Route path='/profile' component={ProfileScreen}/>
              <Route path='/order/:id' component={OrderScreen}/>
              <Route path='/placeorder' component={PlaceOrderScreen}/>
              <Route path='/payment' component={PaymentScreen}/>
              <Route path='/shipping' component={ShippingScreen}/>
              <Route path='/products' component={ProductsScreen}/>
              <Route path='/register' component={RegisterScreen}/>
              <Route path='/signin' component={SigninScreen}/>
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

