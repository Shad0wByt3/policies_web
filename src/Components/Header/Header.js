import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const [submenuVisible, setSubmenuVisible] = useState({
    employee: false,
    policy: false,
    inventory: false,
  });

  const toggleSubmenu = (menu) => {
    setSubmenuVisible((prevState) => {
      const newState = {
        employee: false,
        policy: false,
        inventory: false,
      };
      
      if (!prevState[menu]) {
        newState[menu] = true;
      }
      return newState;
    });
  };

  return (
    <header className="main-header">
      <nav>
        <ul>
          {/* Empleados */}
          <li className="menu-item">
            <button
              className="menu-link"
              onClick={() => toggleSubmenu("employee")}
            >
              Empleados
            </button>
            {submenuVisible.employee && (
              <ul className="submenu">
                <li>
                  <NavLink to="/employee/create">Registrar empleado</NavLink>
                </li>
                <li>
                  <NavLink to="/employee/list">Consultar empleados</NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Póliza */}
          <li className="menu-item">
            <button
              className="menu-link"
              onClick={() => toggleSubmenu("policy")}
            >
              Póliza
            </button>
            {submenuVisible.policy && (
              <ul className="submenu">
                <li>
                  <NavLink to="/policy/create">Crear póliza</NavLink>
                </li>
                <li>
                  <NavLink to="/policy/list">Consultar pólizas</NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Inventario */}
          <li className="menu-item">
            <button
              className="menu-link"
              onClick={() => toggleSubmenu("inventory")}
            >
              Inventario
            </button>
            {submenuVisible.inventory && (
              <ul className="submenu">
                <li>
                  <NavLink to="/inventory/create">Crear producto</NavLink>
                </li>
                <li>
                  <NavLink to="/inventory/list">Consultar productos</NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
