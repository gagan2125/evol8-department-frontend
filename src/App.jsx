import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Setting from "./pages/Setting";

// src/App.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
