import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Setting from "./pages/Setting";

// src/App.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
