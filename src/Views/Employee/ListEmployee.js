import React, { useEffect, useState } from "react";
import "./Employee.css";
import RowEmployee from "../../Components/Employee/RowEmployee";

const API_URL = process.env.REACT_APP_API_URL;

function ListEmployee() {
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_URL}/employee/list`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          throw new Error("Error al obtener la lista de empleados.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="list-employees">
      <h2>Lista de Empleados</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Puesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <RowEmployee key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-employees-message">No hay empleados disponibles.</p>
      )}
    </div>
  );
}

export default ListEmployee;
