import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const FooterLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    {
      title: "Products",
      link: "/product-page",
    },
  ];
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="grid lg:grid-cols-3  pb-20 pt-5">
          <div className="py-8 px-4">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-primary rounded-md text-white">
                Idriss
              </span>
              Electro
            </Link>
            <p className="text-gray-600 pt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur dolor accusamus explicabo ipsa qui rerum?
            </p>
            <p className="text-gray-500 mt-4">Made with by The Coding</p>
          </div>
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li>
                    <Link
                      to={data.link}
                      className="text-gray-600 hover:text-black duration-300"
                    >
                      {data.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li>
                    <Link
                      to={data.link}
                      className="text-gray-600 hover:text-black duration-300"
                    >
                      {data.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl font-bold sm:text-left mb-3">adress</h1>
              <div>
                <div className="flex items-center gap-3 mt-6">
                  <FaLocationArrow />
                  <p>Noida , Uttar Pradesh</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <FaMobileAlt />
                  <p>0646521896</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <Link to={"#"}>
                    <FaInstagram className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                  <Link to={"#"}>
                    <FaLinkedin className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                  <Link to={"#"}>
                    <FaFacebook className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
