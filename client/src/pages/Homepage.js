import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resources/item.css";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("frutas");
  // const categories = [
  //   {
  //     name: "frutas",
  //     imageURL:
  //       "https://th.bing.com/th/id/OIP.FZA43rV0CFl_7FdS-GePpAHaE8?w=300&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  //   {
  //     name: "vegetales",
  //     imageURL:
  //       "https://th.bing.com/th/id/OIP.pDSiqAFJjdcrrOBNQQzTUwHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  //   {
  //     name: "carne",
  //     imageURL:
  //       "https://th.bing.com/th/id/OIP.kRLlPLtniFnJU6U_WTDfHgHaEx?w=281&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  // ];

  const getAllCategories = () => {
    axios
      .get("/api/categories/get-all-categories")
      .then((response) => {
        setCategoriesData(response.data); // Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllItems = () => {
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        setItemsData(response.data); //Actualizar itemsData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
    getAllCategories();
  }, []);
  

  return (
    <DefaultLayout>
      {/* <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategory(category.name)}
              className={`d-flex category ${
                selectedCategory === category.name && "selected-category"
              }`}
            >
              <h4>{category.name}</h4>
              <img src={category.imageURL} height="60" width="80" />
            </div>
          );
        })}
      </div> */}
      <div className="d-flex categories">
        {categoriesData.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategory(category.name)}
              className={`d-flex category ${
                selectedCategory === category.name && "selected-category"
              }`}
              key={category.id}
            >
              <h4>{category.name}</h4>
              <img src={category.image} height="60" width="80" alt={category.name} />
            </div>
          );
        })}
      </div>

      <Row gutter={20}>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => {
            return (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <Item item={item} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
