import { FaInstagram, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const FooterLinks = [
    {
      title: "Home",
      link: "/#",
    },
    {
      title: "About",
      link: "/#about",
    },
    {
      title: "Contact",
      link: "/#contact",
    },
    {
      title: "Blog",
      link: "/#blog",
    },
  ];
  return (
    <div>
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          <div className="py-8 px-4">
            <Link
              to={"/"}
              className="text-black font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              Eshop
            </Link>
            <p className="text-gray-600 lg:pr-24 pt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur dolor accusamus explicabo ipsa qui rerum?
            </p>
            <p className="text-gray-500 mt-4">Made with by The Coding </p>
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
                    <FaInstagram className="text-3xl hover-text-black duration-200" />
                  </Link>
                  <Link to={"#"}>
                    <FaInstagram className="text-3xl hover-text-black duration-200" />
                  </Link>
                  <Link to={"#"}>
                    <FaInstagram className="text-3xl hover-text-black duration-200" />
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