import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import './sass/App.css'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
