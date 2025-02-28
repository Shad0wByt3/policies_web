import React, { useEffect, useState } from "react";
import "./Policy.css";
import RowPolicy from "../../Components/Policy/RowPolicy";

const API_URL = process.env.REACT_APP_API_URL;

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`${API_URL}/policie/list`);
        if (response.ok) {
          const responseData = await response.json();
          const items = responseData.data.items;
          setPolicies(items);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="list-policies">
      <h2>Lista de pólizas</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {policies.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>EMPLEADO</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <RowPolicy key={policy.sku} policy={policy} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay pólizas disponibles.</p>
      )}
    </div>
  );
}

export default Policies;
