import { Routes, Route } from "react-router-dom";
import Users from "./pages/users/page";
import GlobalModal from "./components/ui/popups/global-modal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <GlobalModal />
    </>
  );
}

export default App;
