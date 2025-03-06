import React, { useMemo } from 'react';
import '../resources/simpleTable.css';


const SimpleTable = ({ cartItems = [] }) => {
  /*console.log("Datos recibidos en SimpleTable:", cartItems);*/
  console.log("Tipo de cartItems:", typeof cartItems, Array.isArray(cartItems));


    const items = useMemo(() => {
    if (typeof cartItems === "string") {
    try {
      const parsed = JSON.parse(cartItems);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      console.warn("cartItems no es un array después de parsear:", parsed);
          return [];
        } catch (error) {
          console.error("Error al parsear cartItems:", error);
          return [];
        }
      }

    if (Array.isArray(cartItems)) {
      return cartItems;
    }
    console.warn("cartItems no es un array válido:", cartItems);
        return [];
      }, [cartItems]);

    console.log("Datos en items:", items);

  if (items.length === 0) {
    return <div>No hay datos disponibles S2</div>;
  }

  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio $</th>
          <th>Cantidad</th>
          <th>Tarifa Total $</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item, index) => (
            <tr key={item.id || index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No hay datos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SimpleTable;
