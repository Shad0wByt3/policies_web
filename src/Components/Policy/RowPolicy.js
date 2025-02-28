import React from "react";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../../Utils/PdfUtils";
import "./RowPolicy.css";

const API_URL = process.env.REACT_APP_API_URL;

function RowPolicy({ policy }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/policie/update/${policy.id}`);
  };

  const handleDownload = () => {
    generatePDF(policy);
  }

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar la póliza ${policy.id}?`
      )
    ) {
      fetch(`${API_URL}/policie/delete/${policy.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json().then((data) => {
            if (response.ok) {
              window.location.reload();
            } else {
              const error = new Error("Error al eliminar la póliza.");
              error.data = data;
              throw error;
            }
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.data && error.data.data && error.data.data.mensaje) {
            alert(error.data.data.mensaje);
          } else {
            alert("Hubo un error al eliminar la póliza.");
          }
        });
    }
  };

  return (
    <tr>
      <td>{policy.id}</td>
      <td>{`${policy.employee}: ${policy.employeeName}`}</td>
      <td>{policy.sku}</td>
      <td>{policy.quantity}</td>
      <td>{policy.date}</td>
      <td className="button-container">
        <button onClick={handleDownload}>Descargar</button>
        <button onClick={handleUpdate}>Actualizar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </td>
    </tr>
  );
}

export default RowPolicy;
