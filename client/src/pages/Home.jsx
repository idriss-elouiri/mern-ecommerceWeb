import React from 'react'
import Categories from '../components/Home/Category1'
import Categories2 from '../components/Home/Category2'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/cart/cartSlice'
import Product from '../components/Home/Product'

const Home = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const HeroData = [
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715288526852macbook.png?alt=media&token=e89dfafe-5d63-400f-8a0b-f7d041c08823",
      subtitle: "Beats Solo",
      title: "Branded",
      title2: "Laptops",
      categoryId: "66325041014710c6455a88b4",
    },
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894787599vr.png?alt=media&token=0047fb8b-6c2b-4163-9bf1-418c17247a68",
      subtitle: "Beats Solo",
      title: "Wireless",
      title2: "Virtual",
      categoryId: "66325041014710c6455a88b4",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715288552531headphone.png?alt=media&token=4954fdc9-fad4-4829-b086-f848de10fb17",
      subtitle: "Beats Solo",
      title: "Wireless",
      title2: "Headphone",
      categoryId: "66325033014710c6455a88ae",
    },
  ];
  return (
    <main>
      <Categories/>
      <Categories2/>
      {HeroData.map((product) => {
      <Product product={{...product}} key={product.id} />
})}
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
    </main>
  )
}

export default Home