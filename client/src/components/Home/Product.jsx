import { Link } from "react-router-dom";
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch } from "react-redux";

const Product = ({products , textHeading}) => {
  const dispatch = useDispatch();
  const handleSubmit = (product) => {
    console.log(product)
    dispatch(addItem(product))
  }

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
        <h1 className="text-3xl font-bold lg:text-4xl">{textHeading}</h1>
        <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10  gap-x-10	 place-items-center">
          {products &&
            products.map((product) => (
              <div className="group" key={product._id}>
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="lg:h-[200px] md:h-[150px] sm:h-[200px] h-[250px] object-cover rounded-md pb-2"
                  />
                  <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200">
                    <button
                      className="py-2 px-3 bg-emerald-400 text-white rounded-full"
                      onClick={() => handleSubmit(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="leading-7">
                  <h3 className="font-semibold">
                    <Link to={"/product-details/" + product.slug}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="font-bold">${product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;