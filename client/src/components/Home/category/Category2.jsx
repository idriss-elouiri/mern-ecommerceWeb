import React from "react";
import Button from "../../Button";

const Categories2 = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div className="col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-400/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  CONSOLE
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-primary"}
                  category={"6654872adba4800dc13e81df"}
                ></Button>
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894859498gaming.png?alt=media&token=16c9f9af-2016-45f5-93f9-b4687cfc8227"
              alt=""
              className="w-[250px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>
          <div className="py-10 pl-5 bg-gradient-to-br from-brandGreen/90 to-brandGreen/70 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Oculus
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-brandGreen"}
                  category={"6654873adba4800dc13e81ed"}
                />
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894787599vr.png?alt=media&token=0047fb8b-6c2b-4163-9bf1-418c17247a68"
              alt=""
              className="w-[320px] absolute bottom-0"
            />
          </div>

          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Speakers
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-brandYellow"}
                  category={"66548763dba4800dc13e8203"}
                />
              </div>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894836304speaker.png?alt=media&token=002a3b19-3c3e-4c96-ad9c-58fed5c73165"
              alt=""
              className="w-[200px] absolute bottom-0 right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories2;