import Button from "../ui/buttons/button";
import { useDispatch } from "react-redux";
import UserForm from "../../components/ui/popups/create-user";
import { openModal } from "../../redux/features/modal/modal-slice";

function UserDirectory() {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openModal(<UserForm />));
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between pt-5">
        <div className="">
          <h1 className="md:text-2xl text-xl font-semibold">User directory</h1>{" "}
          <p className="text-xs">Find a list of users below</p>
        </div>
        <div className="flex flex-row rounded-full gap-4">
          <div className="p-4">
            <Button
              onClick={handleOpen}
              icon={<img alt="plus" src="/icons/plus.svg" />}
              className="bg-white text-black border-2 border-black"
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDirectory;
