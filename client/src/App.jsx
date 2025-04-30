import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./pages/monitoring/List";
import Update from "./pages/monitoring/Update";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Lists from "./pages/Lists";
import View from "./pages/monitoring/View";
import NotFound from "./pages/NotFound";
import Evaluator from "./pages/Evaluator";

import Login from "./auth/Login";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route element={<Dashboard />}>
          <Route path="/dashboard" element={<Summary />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/view/:id" element={<View />} />
          <Route path="/lists/update/:id" element={<Update />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
