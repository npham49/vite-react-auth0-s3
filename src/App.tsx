
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Shared from "./pages/Shared";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shared" element={<ProtectedRoute role="member"><Shared/></ProtectedRoute>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
