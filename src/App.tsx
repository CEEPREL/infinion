import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/users/page";
import GlobalModal from "./components/ui/popups/global-modal";
import FeatureUnavailable from "./components/ui/error/unavailable";
import NotFound404 from "./components/ui/error/404";
import Voucher from "./pages/voucher/page";
import Analytics from "./pages/Analytics/page";
import Spotlight from "./pages/Spotlight/page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/user" element={<Users />} />
        <Route path="/dashboard" element={<FeatureUnavailable />} />
        <Route path="/Vouchers" element={<Voucher />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Spotlight" element={<Spotlight />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <GlobalModal />
    </>
  );
}

export default App;
