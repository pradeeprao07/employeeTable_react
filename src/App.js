import "./styles.css";
import EmployeeTable from "./apiTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
