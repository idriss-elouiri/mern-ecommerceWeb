import { Link } from "react-router-dom";

export default function ProductBox(productItem) {
  const { _id, title, price, content, images } = productItem;

  return (
    <div className="w-[250px] border rounded-xl p-2">
      <div className="bg-slate-100 p-2 rounded-xl ">
        <Link to={"/products/" + _id}>
          <img
            src={images[0]}
            className="w-full h-[150px] object-contain"
            alt=""
          />
        </Link>
      </div>
      <div className="mt-2">
        <Link to={"/products/" + _id}>
          <h3 className="font-bold text-lg">{title}</h3>
        </Link>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500 line-clamp-3">
        {content}
      </p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${price}</div>
        <button
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}