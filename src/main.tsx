import { Sidebar } from "./components/layout/side-bar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import App from "./App";
import Header from "./components/layout/header";
import UserDirectory from "./components/layout/user-directory";

function Main() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <>
      <div className={theme === "dark" ? "" : "dark"}>
        <div className="h-screen  w-full flex flex-row bg-white text-black dark:bg-dark dark:text-white transition-colors duration-300">
          <div className="md:min-w-56 md:w-[15%]">
            <Sidebar />
          </div>
          <div className="md:w-[85%] w-full dark:bg-dark p-5">
            <Header />
            <UserDirectory />
            <div className="flex-1 pb-40 overflow-y-auto h-screen">
              <App />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
