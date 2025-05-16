import { useEffect, useState } from "react";
import { Layout, Table, Input, Modal } from "antd";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

const { Header } = Layout;

export default function Product() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const openProductModal = () => {
    setIsModalOpen(true);
  };
  const getData = () => {
    fetch(
      "https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg?tabId=products"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const mappedData = data.data.map((el, i) => ({
          key: el["row_id"],
          ...el,
        }));
        setData(mappedData);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

  const searchProduct = () => {
    if (search === "") {
      getData();
      return;
    }
    fetch(
      `https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg/search?tabId=products&searchKey=Barkod Kodu&searchValue=${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((el, i) => ({
          key: el["row_id"],
          ...el,
        }));
        setData(mappedData);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

  const editProduct = (record) => {
    setEditData(record);
    setIsEditModal(true);
  };
  const columns = [
    {
      title: "Barkod Kodu",
      width: 100,
      dataIndex: "Barkod Kodu",
      key: "Barkod Kodu",
      fixed: "left",
    },
    {
      title: "Ürün Kodu",
      width: 100,
      dataIndex: "Ürün Kodu",
      key: "Ürün Kodu",
      fixed: "left",
    },
    {
      title: "Ürün Adı",
      width: 100,
      dataIndex: "Ürün Adı",
      key: "Ürün Adı",
      fixed: "left",
    },
    {
      title: "Ürün Durumu",
      width: 100,
      dataIndex: "Ürün Durumu",
      key: "Ürün Durumu",
      fixed: "left",
    },
    {
      title: "Ürün Stok Durumu",
      width: 100,
      dataIndex: "Ürün Stok Durumu",
      key: "Ürün Stok Durumu",
      fixed: "left",
    },
    {
      title: "Ürün Stok Adeti",
      width: 100,
      dataIndex: "Ürün Stok Adeti",
      key: "Ürün Stok Adeti",
      fixed: "left",
    },
    {
      title: "Ürün Birim Maliyeti",
      width: 100,
      dataIndex: "Ürün Birim Maliyeti",
      key: "Ürün Birim Maliyeti",
      fixed: "left",
    },
    {
      title: "Ürün Satış Fiyatı",
      width: 100,
      dataIndex: "Ürün Satış Fiyatı",
      key: "Ürün Satış Fiyatı",
      fixed: "left",
    },
    {
      title: "İşlem",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <span onClick={() => editProduct(record)} style={{ cursor: "pointer" }}>
          <EditOutlined style={{ color: "#1890ff" }} />
        </span>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header style={{ padding: "0 20px" }}>
        <span onClick={searchProduct}>
          <SearchOutlined
            style={{ color: "white", scale: "2", marginRight: 15, cursor: "pointer" }}
          />
        </span>

        <Input
          placeholder="Ürün Ara (Barkod veya Stok No)"
          style={{ width: "30%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span onClick={openProductModal}>
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
        <span onClick={openProductModal}></span>
      </Header>
      <Table columns={columns} dataSource={data} />
      <AddProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {editData["Ürün Adı"] && (
        <EditProduct
          isModalOpen={isEditModal}
          setIsModalOpen={setIsEditModal}
          data={editData}
        />
      )}
    </>
  );
}
