import AppScreen from "./AppScreen";
import Icon from "./UI/Icon";
import { Menu } from "../content/menu";
import Taskbar from "./Taskbar";

const Desktop = () => {
  return (
    <>
      <div className="w-screen h-screen bg-transparent">
        <div className=" w-screen h-screen flex justify-center items-center -z-10 flex-col bg-[#008080] overflow-hidden">
          <div className="flex flex-col gap-7 sm:gap-6 absolute justify-start z-10 top-[3%] left-[4%] sm:left-[2%]">
            {Menu.map((menu, i) => {
              return <Icon key={i} menu={menu} />;
            })}
          </div>
          <AppScreen />
          <h1 className=" text-5xl cursor-default selection:bg-current selection:text-current">
            Leopold
          </h1>
          <h2 className=" text-3xl text-white cursor-default selection:bg-current selection:text-current">
            All Round Entwickler
          </h2>
        </div>
      </div>
      <Taskbar />
    </>
  );
};

export default Desktop;
