import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./Views/Employee/CreateEmployee";
import ListEmployee from "./Views/Employee/ListEmployee";
import Main from "./Views/Main/Main";
import UpdateEmployee from "./Views/Employee/UpdateEmployee";
import CreateProduct from "./Views/Inventory/CreateProduct";
import Inventory from "./Views/Inventory/Inventory";
import CreatePolicy from "./Views/Policy/CreatePolicy";
import Policies from "./Views/Policy/Policies";
import UpdateProduct from "./Views/Inventory/UpdateProduct";
import UpdatePolicy from "./Views/Policy/UpdatePolicy";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            {/* ROUTING EMPLEADO */}
            <Route path="/employee/create" element={<CreateEmployee />} />
            <Route path="/employee/list" element={<ListEmployee />} />
            <Route
              path="/employee/update/:username"
              element={<UpdateEmployee />}
            />

            {/* ROUTING INVENTARIO */}
            <Route path="/inventory/create" element={<CreateProduct />} />
            <Route path="/inventory/list" element={<Inventory />} />
            <Route path="/inventory/update/:sku" element={<UpdateProduct />} />

            {/* ROUTING PÓLIZA */}
            <Route path="/policy/create" element={<CreatePolicy />} />
            <Route path="/policy/list" element={<Policies />} />
            <Route path="/policie/update/:id" element={<UpdatePolicy />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
