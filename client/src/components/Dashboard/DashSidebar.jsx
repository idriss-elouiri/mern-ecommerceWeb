import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi";
import { CgShoppingCart } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(location.search).get("tab");
    if (tabFromUrl) setActiveTab(tabFromUrl);
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) dispatch(signoutSuccess());
      else console.log("Failed to sign out");
    } catch (error) {
      console.log("Signout error:", error.message);
    }
  };

  const sidebarItems = [
    { label: "Dashboard", icon: HiChartPie, tab: "dash", adminOnly: true },
    { label: "Profile", icon: HiUser, tab: "profile", labelColor: currentUser?.isAdmin ? "Admin" : "User" },
    { label: "Products", icon: HiDocumentText, tab: "products", adminOnly: true },
    { label: "Users", icon: HiOutlineUserGroup, tab: "users", adminOnly: true },
    { label: "Comments", icon: HiAnnotation, tab: "comments", adminOnly: true },
    { label: "Categories", icon: IoIosSettings, tab: "categories", adminOnly: true },
    { label: "Orders", icon: CgShoppingCart, tab: "orders", adminOnly: true },
  ];

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {sidebarItems.map(({ label, icon, tab, adminOnly = false, labelColor }) => (
            (!adminOnly || currentUser?.isAdmin) && (
              <Link key={tab} to={`/dashboard?tab=${tab}`}>
                <Sidebar.Item active={activeTab === tab || (!activeTab && tab === "dash")} icon={icon} as="div">
                  {label}
                </Sidebar.Item>
              </Link>
            )
          ))}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
