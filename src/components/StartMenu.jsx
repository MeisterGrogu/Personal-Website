import { useContext } from "react";
import { Menu } from "../content/menu";
import AppContext from "../context/AppContext";

const StartMenu = ({ setCloseStartMenu }) => {
  const { state, openApp } = useContext(AppContext);
  return (
    <>
      <div
        className="w-screen h-screen z-[99] absolute top-0 left-0"
        onClick={() => setCloseStartMenu((prev) => !prev)}
      />
      <div
        aria-label="startMenu"
        className=" flex z-[999] h-[300px] w-[200px] bg-[#fff] border-t-[#fff]  border-b-[grey] border-s-[#fff] border-[1px] border-e-0 p-[2px] absolute left-[2px] bottom-[36px]"
      >
        <div
          className=" w-[25px] h-full flex items-end bg-[#7b7d7b]"
          aria-label="startMenu_SideBar"
        >
          <img
            src="data:image/png;base64,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"
            alt="sidebar"
            className="w-[18px]"
          />
        </div>
        <div className="flex justify-between flex-col">
          <ul
            aria-label="startMenu_menuList"
            className=" list-none ms-1 pointer-events-auto "
          >
            {Menu.map((app, i) => {
              return (
                <li
                  key={i}
                  className=" cursor-pointer flex gap-2 justify-start items-center p-[3px] h-[38px] border-b-[1px] border-b-white hover:bg-[#dedede] hover:border-b-black"
                  onClick={() => {
                    if (state[app.name].open !== true) openApp(app.name);
                    setCloseStartMenu((prev) => !prev);
                  }}
                >
                  <img
                    src={app.path}
                    alt={app.name + "Icon"}
                    className={app.startIconSize}
                  />
                  <span className="text-[15px] sm:text-[13px] pt-[1px]">
                    {app.name}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className=" cursor-pointer flex gap-2 justify-start p-[3px] border-t border-t-black w-[169px] pt-3 hover:bg-[#dedede]">
            <img
              src="/assets/shutdown.png"
              alt="ShutdownIcon"
              className=" w-[25px] h-[25px]"
            />
            <span className="text-[14px] sm:text-[13px]">Herunterfahren...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
