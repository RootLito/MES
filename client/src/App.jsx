import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import List from "./pages/monitoring/List";
import Update from "./pages/monitoring/Update";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import View from "./pages/monitoring/View";

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
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/monitoring/list" element={<List />} />
              <Route path="/monitoring/view/:id" element={<View />} />
              <Route path="/monitoring/update/:id" element={<Update />} />
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
