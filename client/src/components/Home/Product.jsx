import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const Product = ({product}) => {
    console.log(product)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };
 
  return (
    <div>
      <h3>{product.title2}</h3>
      <p>{product.title}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
