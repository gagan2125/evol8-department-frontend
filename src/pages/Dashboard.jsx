import { useState, useEffect } from "react";
import Card from "../components/Card";
import LeftSidebar from "../components/LeftSidebar";
import url from "../constants/baseUrl";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/department/get-department`);
        const result = await response.json();
        setData(result);

        // Calculate total departments
        setCount(result.length);

        // Calculate active departments
        const activeCount = result.filter(
          (department) => department.is_active === "YES"
        ).length;
        setActiveCount(activeCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Card count={count} activeCount={activeCount} />
      </div>
    </div>
  );
};

export default Dashboard;
