import { useState } from "react";
import { useLocation } from "react-router-dom";

const LeftSidebar = () => {
  const [open, setOpen] = useState(true);
  const locations = useLocation();
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", location: "/" },
    { title: "Department", src: "User", location: "/department" },
    { title: "Setting ", src: "Setting", gap: true, location: "/settings" },
  ];
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Evol8 Company
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <>
            <a href={Menu.location}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${
                  locations.pathname === Menu.location
                    ? "bg-light-white " // Highlight active menu item
                    : ""
                }`}
              >
                <img src={`./src/assets/${Menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </a>
          </>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
