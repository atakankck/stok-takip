import { useState } from "react";
import "./App.css";
import React from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  HistoryOutlined, // bu ikon eklendi
} from "@ant-design/icons";

const { Sider } = Layout;

export default function NavigationBar({ selectedMenu, setSelectedMenu }) {
  return (
    <Sider>
      <div style={{ color: "white", padding: 25, fontWeight: "bold", scale : 2, textAlign: "center"}}>
        Mysaas
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["products"]}
        onClick={({ key }) => setSelectedMenu(key)}
        items={[
          {
            key: "products",
            icon: <AppstoreOutlined />,
            label: "Ürün Yönetimi",
          },
          {
            key: "stock",
            icon: <DatabaseOutlined />,
            label: "Stok Yönetimi",
          },
          {
            key: "stockMovements",
            icon: <HistoryOutlined />,
            label: "Stok Hareketleri",
          },
        ]}
      />
    </Sider>
  );
}
