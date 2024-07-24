import React from 'react'
import Categories from '../components/Home/Category1'
import Categories2 from '../components/Home/Category2'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/cart/cartSlice'
import Product from '../components/Home/Product'

const Home = () => {
 
  return (
    <main>
      <Categories/>
      <Categories2/>
      </main>
)
}
export default Home