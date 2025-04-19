// import React, { useEffect, useState } from "react";
// import { DashboardSidebar } from "../components/SharedHeader/DashboardSidebar";
// import { DashboardProfile } from "@/components/SharedHeader/DashboardProfile";
// import { useLocation } from "react-router-dom";
// import NewsArticle from "./NewsArticle";
// import About from "./About";
// import CreatePost from "./CreatePost";
// import { useSelector } from "react-redux";
// const Dashboard = () => {
//   const [tab, setTab] = useState("");
//   const location = useLocation();
//   const { currentUser } = useSelector((state) => state.user);
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tab = urlParams.get("tab");
//     console.log("tab is ", tab);
//     setTab(tab);
//   }, [location.search]);

//   return (
//     <div className="flex">
//       {/* this is side bar for bashbaorad*/}
//       <div className="h-screen">
//         {" "}
//         <DashboardSidebar />{" "}
//       </div>
//       {/* creating profile  */}
//       <div className="w-full">
//         {tab === "profile" && <DashboardProfile />}
//         {tab === "news" && <NewsArticle />}
//         {tab === "about" && <About />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
