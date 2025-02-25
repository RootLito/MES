import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Survey from "./pages/Survey";
import List from "./pages/List";
import Home from "./pages/Home";

function App() {
    return (
        <div className="w-full min-h-screen">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/survey" element={<Survey />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
