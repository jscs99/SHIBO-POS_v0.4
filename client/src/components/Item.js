import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../redux/rootReducer"; // la ruta es correcta

function Item({ item }) {
  const dispatch = useDispatch();

  function addToCartHandler() {
    if (!item.id) {
      console.error("El ítem no tiene un ID:", item);
      return;
    }
    dispatch(addToCart({ ...item, quantity: 1 }));
    toast.success('¡Producto agregado al carrito!', {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false
            
    });
  }

  return (
    <div className="item">
      <h4 className="name">{item.name}</h4>
      <img src={item.image} alt="" height="100" width="100" />
      <h4 className="price">
        <b>Price : </b>
        {item.priceWIVA} $/-
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={addToCartHandler}>Agregar</Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Item;
