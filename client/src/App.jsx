import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Survey from "./pages/Survey";
import List from "./pages/List";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen flex bg-gray-200">
        <Sidebar />
        <div className="w-full min-h-screen flex flex-col">
          <Nav />
          <div className="flex flex-col flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/list" element={<List />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
