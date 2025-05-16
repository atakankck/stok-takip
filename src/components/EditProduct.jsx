import { useEffect, useState } from "react";
import { Layout, Table, Input, Modal, Select, InputNumber } from "antd";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

export default function EditProduct({ isModalOpen, setIsModalOpen, data }) {
  const [code, setCode] = useState(data["Ürün Kodu"]);
  const [barcode, setBarcode] = useState(data["Barkod Kodu"]);
  const [name, setName] = useState(data["Ürün Adı"]);
  const [status, setStatus] = useState(data["Ürün Durumu"]);
  const [rowId, setRowId] = useState(data["row_id"]);
  const [inventoryStatus, setInventoryStatus] = useState(
    data["Ürün Stok Durumu"]
  );
  const [inventoryQuantity, setInventoryQuantity] = useState(
    data["Ürün Stok Adeti"]
  );
  const [cost, setCost] = useState(data["Ürün Birim Maliyeti"]);
  const [price, setPrice] = useState(data["Ürün Satış Fiyatı"]);
  const handleOk = () => {
    postData();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setRowId(data["row_id"]);
    setCode(data["Ürün Kodu"]);
    setBarcode(data["Barkod Kodu"]);
    setName(data["Ürün Adı"]);
    setStatus(data["Ürün Durumu"]);
    setInventoryStatus(data["Ürün Stok Durumu"]);
    setInventoryQuantity(data["Ürün Stok Adeti"]);
    setCost(data["Ürün Birim Maliyeti"]);
    setPrice(data["Ürün Satış Fiyatı"]);
  }, [data]);
  const postData = () => {
    const yeniUrun = {
      "Ürün Kodu": code, 
      "Barkod Kodu": barcode, 
      "Ürün Adı":name, 
      "Ürün Durumu":status,
      "Ürün Stok Durumu":inventoryStatus, 
      "Ürün Stok Adeti":inventoryQuantity,
      "Ürün Birim Maliyeti":cost, 
      "Ürün Satış Fiyatı":price,
      "row_id":rowId,
    };
    fetch(
      "https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg?tabId=products",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(yeniUrun),
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
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ürün Kodu</span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
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
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ürün Adı</span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "50%" }}
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
          style={{ width: "50%" }}
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
          onChange={(e) => setCost(e)}
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
          onChange={(e) => setPrice(e)}
          style={{ width: "50%", textAlign: "right" }}
        />
      </div>
    </Modal>
  );
}
