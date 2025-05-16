import { useEffect, useState } from "react";
import { Layout, Table, Input, Modal, Select, InputNumber } from "antd";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

export default function AddProduct({ isModalOpen, setIsModalOpen }) {
  const [code, setCode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [inventoryStatus, setInventoryStatus] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState("");
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const handleOk = () => {
    postData()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const postData = () => {
    const yeniUrun = [
    code,           // Ürün Kodu
    barcode,    // Barkod Kodu
    name,       // Ürün Adı
    status,            // Ürün Durumu
    inventoryStatus,           // Ürün Stok Durumu
    inventoryQuantity,                // Ürün Stok Adeti
    cost,               // Ürün Birim Maliyeti
    price               // Ürün Satış Fiyatı
  ];
    fetch(
      "https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg?tabId=products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([yeniUrun]),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Başarılı POST:", data);
      })
      .catch((error) => {
        console.error("POST Hatası:", error);
      });
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: 700, fontSize: 22 }}>Yeni Ürün Ekle</span>
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Yeni Ürün Ekle"
      cancelText="Vazgeç"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Barkod Kodu</span>

        <Input
          placeholder="15 Haneli Barkod Kodu Giriniz"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={20}
          style={{ width: "50%", textAlign: "right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ürün Kodu</span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          maxLength={20}
          style={{ width: "50%", textAlign: "right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ürün Adı</span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "50%", textAlign:"right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ürün Durumu</span>

        <Select
          value={status}
          onChange={(val) => {
            setStatus(val);
          }}
          style={{ width: "50%", textAlign: "right" }}
        >
          <Select.Option value="Aktif">Aktif</Select.Option>
          <Select.Option value="Pasif">Pasif</Select.Option>
          <Select.Option value="Beklemede">Beklemede</Select.Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          Ürün Stok Durumu
        </span>

        <Select
          value={inventoryStatus}
          onChange={(val) => {
            setInventoryStatus(val);
          }}
          style={{ width: "50%", textAlign: "right" }}
        >
          <Select.Option value="Kritik Stok">Kritik Stok</Select.Option>
          <Select.Option value="Normal Stok">Normal Stok</Select.Option>
          <Select.Option value="Stok Yok">Stok Yok</Select.Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          Ürün Stok Adeti
        </span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
          value={inventoryQuantity}
          onChange={(e) => setInventoryQuantity(e.target.value)}
          style={{ width: "50%",textAlign:"right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          Ürün Birim Maliyeti
        </span>

        <InputNumber
          formatter={(value) =>
            `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/₺\s?|(,*)/g, "")}
          placeholder="Fiyat girin"
          value={cost}
          onChange={(e) =>setCost(e)}
          style={{ width: "50%", textAlign: "right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          Ürün Satış Fiyatı
        </span>
        <InputNumber
          formatter={(value) =>
            `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/₺\s?|(,*)/g, "")}
          placeholder="Fiyat girin"
          value={price}
          onChange={(e) =>setPrice(e)}
          style={{ width: "50%", textAlign: "right" }}
        />
      </div>
    </Modal>
  );
}
