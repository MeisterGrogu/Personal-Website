import { useContext } from "react";
import AppScreenFrame from "./UI/AppScreenFrame";
import { Menu } from "../content/menu";
import AppContext from "../context/AppContext";
import Über from "./Apps/Über";
import Mail from "./Apps/Mail";
import Projekte from "./Apps/Projekte";
import Pong from "./Apps/Pong";
import Snake from "./Apps/Snake";
import Minesweeper from "./Apps/Minesweeper";


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
      {state.Pong?.open && (
        <AppScreenFrame
          appInfo={Menu[3]} // Pong is the 4th item in Menu array
          className=""
          isActive={state.Pong.top}
          isMaximized={state.Pong.fullscreen}
          isMinimized={state.Pong.minimize}
        >
          <Pong isMaximized={state.Pong.fullscreen} />
        </AppScreenFrame>
      )}
      {state.Snake?.open && (
        <AppScreenFrame
          appInfo={Menu[4]}
          className=""
          isActive={state.Snake.top}
          isMaximized={state.Snake.fullscreen}
          isMinimized={state.Snake.minimize}
        >
          <Snake isMaximized={state.Snake.fullscreen} />
        </AppScreenFrame>
      )}

      {state.Minesweeper?.open && (
        <AppScreenFrame
          appInfo={Menu[5]}
          className=""
          isActive={state.Minesweeper.top}
          isMaximized={state.Minesweeper.fullscreen}
          isMinimized={state.Minesweeper.minimize}
        >
          <Minesweeper isMaximized={state.Minesweeper.fullscreen} />
        </AppScreenFrame>
      )}
    </>
  );
};

export default AppScreen;
