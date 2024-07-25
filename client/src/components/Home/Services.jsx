import React from "react";
import {
  FaCarSide,
  FaCheckCircle,
  FaHeadphonesAlt,
  FaWallet,
} from "react-icons/fa";

const Services = () => {
  const ServicesData = [
    {
      id: 1,
      icon: <FaCarSide className="text-4xl md:text-5xl text-emerald-600" />,
      title: "Free Shipping",
      description: "Free Shipping On All Order",
    },
    {
      id: 2,
      icon: <FaCheckCircle className="text-4xl md:text-5xl text-emerald-600" />,
      title: "Save Money",
      description: "30 Days Money Back",
    },
    {
      id: 3,
      icon: <FaWallet className="text-4xl md:text-5xl text-emerald-600" />,
      title: "Secure Payment",
      description: "All Secure Payment",
    },
    {
      id: 4,
      icon: (
        <FaHeadphonesAlt className="text-4xl md:text-5xl text-emerald-600" />
      ),
      title: "Online Support 24/7",
      description: "Technical Support 24/7",
    },
  ];
  return (
    <div>
      <div className="container my-14 md:my-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {ServicesData.map((data) => (
            <div className="flex flex-col items-start sm:flex-row gap-4">
              {data.icon}
              <div>
                <h1 className="lg:text-xl font-bold">{data.title}</h1>
                <h1 className="text-gray-400 text-sm">{data.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;