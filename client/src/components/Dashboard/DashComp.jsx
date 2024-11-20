import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, lastMonthCount, Icon }) => (
  <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-md uppercase">{title}</h3>
        <p className="text-2xl">{count}</p>
      </div>
      <Icon className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
    </div>
    <div className="flex gap-2 text-sm">
      <span className="text-green-500 flex items-center">
        <HiArrowNarrowUp />
        {lastMonthCount}
      </span>
      <div className="text-gray-500">الشهر الماضي</div>
    </div>
  </div>
);

const DashboardComp = () => {
  const [data, setData] = useState({
    users: [],
    comments: [],
    products: [],
    totalUsers: 0,
    totalProducts: 0,
    totalComments: 0,
    lastMonthUsers: 0,
    lastMonthProducts: 0,
    lastMonthComments: 0,
  });
  const { currentUser } = useSelector((state) => state.user);

  const fetchData = useCallback(async (endpoint) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/${endpoint}?limit=5`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }, []);

  useEffect(() => {
    if (currentUser.isAdmin) {
      const fetchAllData = async () => {
        const [userData, productData, commentData] = await Promise.all([
          fetchData("user/getusers"),
          fetchData("product/getproducts"),
          fetchData("comment/getcomments"),
        ]);

        setData({
          users: userData.users || [],
          comments: commentData.comments || [],
          products: productData.products || [],
          totalUsers: userData.totalUsers || 0,
          totalProducts: productData.totalProducts || 0,
          totalComments: commentData.totalComments || 0,
          lastMonthUsers: userData.lastMonthUsers || 0,
          lastMonthProducts: productData.lastMonthProducts || 0,
          lastMonthComments: commentData.lastMonthComments || 0,
        });
      };

      fetchAllData();
    }
  }, [currentUser, fetchData]);

  const {
    totalUsers,
    totalProducts,
    totalComments,
    lastMonthUsers,
    lastMonthProducts,
    lastMonthComments,
    users,
    comments,
    products,
  } = data;

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <DashboardCard
          title="إجمالي المستخدمين"
          count={totalUsers}
          lastMonthCount={lastMonthUsers}
          Icon={HiOutlineUserGroup}
        />
        <DashboardCard
          title="إجمالي التعليقات"
          count={totalComments}
          lastMonthCount={lastMonthComments}
          Icon={HiAnnotation}
        />
        <DashboardCard
          title="إجمالي المنتجات"
          count={totalProducts}
          lastMonthCount={lastMonthProducts}
          Icon={HiDocumentText}
        />
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {[
          {
            title: "المستخدمون الجدد",
            data: users,
            fields: ["profilePicture", "name"],
            link: "/dashboard?tab=users",
          },
          {
            title: "التعليقات الحديثة",
            data: comments,
            fields: ["content", "numberOfLikes"],
            link: "/dashboard?tab=comments",
          },
          {
            title: "المنتجات الحديثة",
            data: products,
            fields: ["images[0]", "title", "category"],
            link: "/dashboard?tab=products",
          },
        ].map(({ title, data, fields, link }, index) => (
          <div
            key={index}
            className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800"
          >
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="text-center p-2">{title}</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={link}>عرض الكل</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                {fields.map((field, idx) => (
                  <Table.HeadCell key={idx}>
                    {field === "images[0]"
                      ? "صورة المنتج"
                      : field === "name"
                      ? "الاسم"
                      : field === "content"
                      ? "التعليق"
                      : field === "numberOfLikes"
                      ? "الإعجابات"
                      : field}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              {data.map((item) => (
                <Table.Body key={item._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    {fields.map((field, idx) => (
                      <Table.Cell key={idx} className="w-96">
                        {typeof item[field] === "string" ? (
                          <img
                            src={item[field]}
                            alt={field}
                            className="w-10 h-10 rounded-full bg-gray-500"
                          />
                        ) : (
                          <p className="line-clamp-2">{item[field]}</p>
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardComp;
