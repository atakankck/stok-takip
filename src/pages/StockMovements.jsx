import React, { useEffect, useState } from "react";
import { Table } from "antd";
import ExportModal from "../components/ExportModal";
import { PrinterOutlined } from "@ant-design/icons";

export default function StockMovements() {
  const [data, setData] = useState([]);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const columns = [
    { title: "Ürün Kodu", dataIndex: "Ürün Kodu", key: "Ürün Kodu" },
    { title: "Barkod Kodu", dataIndex: "Barkod Kodu", key: "Barkod Kodu" },
    { title: "İşlem Türü", dataIndex: "İşlem Türü", key: "İşlem Türü" },
    { title: "Miktar", dataIndex: "Miktar", key: "Miktar" },
    { title: "Tarih", dataIndex: "Tarih", key: "Tarih" },
    { title: "Açıklama", dataIndex: "Açıklama", key: "Açıklama" },
  ];

  const getData = () => {
    fetch(
      "https://v1.nocodeapi.com/atakankck2/google_sheets/OnlgJgEtZDoMyahj?tabId=hareketler"
    )
      .then((res) => res.json())
      .then((response) => {
        const mapped = response.data.map((row, i) => ({
          key: i,
          ...row,
        }))
        .sort((a, b) => new Date(b["Tarih"]) - new Date(a["Tarih"]));
        setData(mapped);
      })
      .catch((err) => console.error("Hata:", err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <PrinterOutlined
          onClick={() => setExportModalOpen(true)}
          style={{ fontSize: 24, cursor: "pointer" }}
        />
      </div>
      <Table columns={columns} dataSource={data} />
      <ExportModal isOpen={exportModalOpen} setIsOpen={setExportModalOpen} />
    </div>
  );
}
