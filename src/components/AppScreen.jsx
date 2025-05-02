import { useContext } from "react";
import AppScreenFrame from "./UI/AppScreenFrame";
import { Menu } from "../content/menu";
import AppContext from "../context/AppContext";
import Über from "./Apps/Über";
import Mail from "./Apps/Mail";
import Projekte from "./Apps/Projekte";

const AppScreen = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.Über.open && (
        <AppScreenFrame
          appInfo={Menu[0]}
          className=""
          isActive={state.Über.top}
          isMaximized={state.Über.fullscreen}
          isMinimized={state.Über.minimize}
        >
          <Über isMaximized={state.Über.fullscreen} />
        </AppScreenFrame>
      )}
      {state.Projekte.open && (
        <AppScreenFrame
          appInfo={Menu[1]}
          className=""
          isActive={state.Projekte.top}
          isMaximized={state.Projekte.fullscreen}
          isMinimized={state.Projekte.minimize}
        >
          <Projekte isMaximized={state.Projekte.fullscreen} />
        </AppScreenFrame>
      )}
      {state.Mail.open && (
        <AppScreenFrame
          appInfo={Menu[2]}
          className=""
          isActive={state.Mail.top}
          isMaximized={state.Mail.fullscreen}
          isMinimized={state.Mail.minimize}
        >
          <Mail isMaximized={state.Mail.fullscreen} />
        </AppScreenFrame>
      )}
    </>
  );
};

export default AppScreen;
