import React, { useEffect, useState } from "react";
import { Layout, Table, Input } from "antd";
import { SearchOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import StockTransactionModal from "../components/StockTransactionModal";

const { Header } = Layout;

export default function Stock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const openStockModal = () => {
    setIsModalOpen(true);
  };

  const getData = () => {
    fetch(
      "https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg?tabId=products"
    )
      .then((res) => res.json())
      .then((response) => {
        const mapped = response.data.map((el, i) => ({
          key: el["row_id"],
          ...el,
        }));
        setData(mapped);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  };

  const searchProduct = () => {
    if (search.trim() === "") {
      getData();
      return;
    }

    fetch(
      `https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg/search?tabId=products&searchKey=Barkod Kodu&searchValue=${search.trim()}`
    )
      .then((res) => res.json())
      .then((result) => {
        const mapped = result.map((el, i) => ({
          key: el["row_id"],
          ...el,
        }));
        setData(mapped);
      })
      .catch((err) => console.error("Arama hatası:", err));
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { title: "Barkod Kodu", dataIndex: "Barkod Kodu", key: "Barkod Kodu" },
    { title: "Ürün Kodu", dataIndex: "Ürün Kodu", key: "Ürün Kodu" },
    { title: "Ürün Adı", dataIndex: "Ürün Adı", key: "Ürün Adı" },
    { title: "Ürün Durumu", dataIndex: "Ürün Durumu", key: "Ürün Durumu" },
    {
      title: "Ürün Stok Durumu",
      dataIndex: "Ürün Stok Durumu",
      key: "Ürün Stok Durumu",
    },
    {
      title: "Ürün Stok Adeti",
      dataIndex: "Ürün Stok Adeti",
      key: "Ürün Stok Adeti",
    },
    {
      title: "Ürün Birim Maliyeti",
      dataIndex: "Ürün Birim Maliyeti",
      key: "Ürün Birim Maliyeti",
    },
    {
      title: "Ürün Satış Fiyatı",
      dataIndex: "Ürün Satış Fiyatı",
      key: "Ürün Satış Fiyatı",
    },
  ];

  return (
    <>
      <Header style={{ padding: "0 20px" }}>
        <span onClick={searchProduct}>
          <SearchOutlined
            style={{ color: "white", scale: "2", marginRight: 15, cursor: "pointer" }}
          />
        </span>
        <Input
          placeholder="Barkod Numarasıyla Ara"
          style={{ width: "30%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span onClick={openStockModal}>
          <AppstoreAddOutlined
            style={{
              position: "absolute",
              right: 85,
              top: 30,
              scale: 2,
              color: "white",
              cursor: "pointer",
            }}
          />
        </span>
      </Header>
      <Table columns={columns} dataSource={data} />
      <StockTransactionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
