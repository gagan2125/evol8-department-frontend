import { useState, useEffect } from "react";
import Card from "../components/Card";
import LeftSidebar from "../components/LeftSidebar";
import url from "../constants/baseUrl";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  const [catCount, setCatCount] = useState(0);
  const [activeCatCount, setActiveCatCount] = useState(0);

  const [subCount, setSubCount] = useState(0);
  const [activeSubCount, setActiveSubCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/department/get-department`);
        const result = await response.json();
        setData(result);
        setCount(result.length);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/category/get-category`);
        const result = await response.json();
        setData(result);
        setCatCount(result.length);
        const activeCount = result.filter(
          (department) => department.is_active === "YES"
        ).length;
        setActiveCatCount(activeCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/subcategory/get-subcategory`);
        const result = await response.json();
        setData(result);
        setSubCount(result.length);
        const activeCount = result.filter(
          (department) => department.is_active === "YES"
        ).length;
        setActiveSubCount(activeCount);
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
        <div className="flex flex-wrap gap-8">
          <Card title={"Departments"} count={count} activeCount={activeCount} />
          <Card
            title={"Categories"}
            count={catCount}
            activeCount={activeCatCount}
          />
          <Card
            title={"Sub Categories"}
            count={subCount}
            activeCount={activeSubCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
