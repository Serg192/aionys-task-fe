import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Notes } from "./pages/Notes";
import { Navbar } from "./components";

function App() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <div className="pt-24 bg-gray-100 min-h-screen px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
