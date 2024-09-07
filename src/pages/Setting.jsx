import LeftSidebar from "../components/LeftSidebar";

const Setting = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Settings</h1>
      </div>
    </div>
  );
};

export default Setting;
