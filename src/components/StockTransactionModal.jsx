import React, { useState } from "react";
import { Modal, Input, InputNumber, message, Button } from "antd";
import dayjs from "dayjs";

export default function StockTransactionModal({ isModalOpen, setIsModalOpen }) {
  const [barkod, setBarkod] = useState("");
  const [miktar, setMiktar] = useState(0);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setBarkod("");
    setMiktar(0);
  };

  const handleSubmit = async () => {
    if (!barkod.trim() || miktar === 0) {
      message.warning("Barkod ve miktar boş olamaz.");
      return;
    }

    setLoading(true);

    try {
      // 1. Ürünü barkoda göre getir
      const res = await fetch(
        `https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg/search?tabId=products&searchKey=Barkod Kodu&searchValue=${barkod.trim()}`
      );
      const result = await res.json();
      const product = result?.[0];

      if (!product || !product["row_id"]) {
        message.error("Ürün bulunamadı veya row_id eksik.");
        setLoading(false);
        return;
      }

      // 2. Yeni stok hesapla
      const mevcutStok = parseInt(product["Ürün Stok Adeti"]) || 0;
      const yeniStok = mevcutStok + miktar;

      // 3. Güncellenmiş veriyi sade JSON formatında gönder
      const updatedRow = {
        "Ürün Kodu": product["Ürün Kodu"],
        "Barkod Kodu": product["Barkod Kodu"],
        "Ürün Adı": product["Ürün Adı"],
        "Ürün Durumu": product["Ürün Durumu"],
        "Ürün Stok Durumu": product["Ürün Stok Durumu"],
        "Ürün Stok Adeti": yeniStok,
        "Ürün Birim Maliyeti": product["Ürün Birim Maliyeti"],
        "Ürün Satış Fiyatı": product["Ürün Satış Fiyatı"],
        "row_id": product["row_id"]
      };

      await fetch(
        `https://v1.nocodeapi.com/atakankck2/google_sheets/pHfTUStOvDwcBXqg?tabId=products`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRow),
        }
      );

      // 4. Stok hareketini kayıt et
      const hareketSatiri = [
        product["Ürün Kodu"],
        product["Barkod Kodu"],
        miktar > 0 ? "Giriş" : "Çıkış",
        miktar,
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
        "Elle işlem",
      ];

      await fetch(
        `https://v1.nocodeapi.com/atakankck2/google_sheets/OnlgJgEtZDoMyahj?tabId=hareketler`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([hareketSatiri]),
        }
      );

      message.success("Stok işlemi başarıyla tamamlandı.");
      closeModal();
    } catch (err) {
      console.error(err);
      message.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Stok Girişi / Çıkışı"
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <p><strong>Barkod Numarası</strong></p>
      <Input
        placeholder="Barkod numarası girin"
        value={barkod}
        onChange={(e) => setBarkod(e.target.value)}
      />

      <p style={{ marginTop: 12 }}>
        <strong>Adet (Pozitif = Giriş, Negatif = Çıkış)</strong>
      </p>
      <InputNumber
        style={{ width: "100%" }}
        value={miktar}
        onChange={setMiktar}
      />

      <Button
        type="primary"
        style={{ marginTop: 16, width: "100%" }}
        loading={loading}
        onClick={handleSubmit}
      >
        İşlemi Kaydet
      </Button>
    </Modal>
  );
}
