import SearchInput from "../ui/inputs/search-input";
import Notification from "../user/notification";
import Profile from "../user/profile";

function Header() {
  return (
    <div className="hidden md:flex flex-row items-center justify-between">
      <div className=" w-72">
        <SearchInput placeholder="Search" />
      </div>
      <div className="flex flex-row rounded-full gap-4">
        <Notification />
        <Profile />
      </div>
    </div>
  );
}

export default Header;
