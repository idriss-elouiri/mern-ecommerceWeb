import Button from "../../Button";
import React from "react";

const Categories = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Earphone
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                  category={"66548534dba4800dc13e8175"}
                />
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894874514earphone.png?alt=media&token=586f6bea-1921-40e4-8706-4708d673d7"
              alt=""
              className="w-[200px] absolute top-0 right-0 -z-[10px]"
            />
          </div>
          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Gadget
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-brandYellow"}
                  category={"6632502c014710c6455a88a8"}
                />
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715434583905watch.png?alt=media&token=2d3bb132-0565-4c6d-a7e5-70d2d2d02021"
              alt=""
              className="w-[320px] absolute -right-4 lg:top-[40px]"
            />
          </div>
          <div className="col-span-2 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Laptop
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-primary"}
                  category={"66325041014710c6455a88b4"}
                />
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715288526852macbook.png?alt=media&token=e89dfafe-5d63-400f-8a0b-f7d041c08823"
              alt=""
              className="w-[250px] absolute top-1/2 -right-0 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;