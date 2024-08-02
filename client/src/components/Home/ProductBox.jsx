import { Link } from "react-router-dom";
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductBox({productInfo}) {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);



  return (
    <div className="w-[250px] border rounded-xl p-2">
      <div className="bg-slate-100 p-2 rounded-xl ">
        <Link >
          <img
            src={productInfo.images[0]}
            className="w-full h-[150px] object-contain"
            alt=""
          />
        </Link>
      </div>
      <div className="mt-2">
        <Link >
          <h3 className="font-bold text-lg">{productInfo.title}</h3>
        </Link>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500 line-clamp-3">
        {productInfo.briefDesc}
      </p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${productInfo.price}</div>
        <button
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
          onClick={() => dispatch(addItem(productInfo))}
        >
          +
        </button>
      </div>
      <Link to={`/product-details/${productInfo.slug}`} className="underline hover:text-primary py-3">Read More...</Link>
    </div>
  );
}