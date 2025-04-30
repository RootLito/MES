import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

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
