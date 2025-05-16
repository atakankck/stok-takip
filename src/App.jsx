import { useState } from "react";
import "./App.css";
import React from "react";
import { Layout } from "antd";
import NavigationBar from "./layout/navigationBar";
import Product from "./pages/Product";
import Stock from "./pages/Stock";
import StockMovements from "./pages/StockMovements";

const { Content } = Layout;

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("products");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavigationBar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <Layout>
        <Content style={{ background: "#fff" }}>
          {selectedMenu === "products" && <Product />}
          {selectedMenu === "stock" && <Stock />}
          {selectedMenu === "stockMovements" && <StockMovements />}
        </Content>
      </Layout>
    </Layout>
  );
}
