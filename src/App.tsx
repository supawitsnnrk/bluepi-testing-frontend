import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendingPage from "./pages/VendingPage/VendingPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
