import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex bg-gray-200">
      <Sidebar />
      <div className="w-full min-h-screen flex flex-col overflow-hidden">
        <Nav />

        <div className="flex flex-col flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
