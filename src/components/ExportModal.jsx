import React, { useState } from "react";
import { Modal, DatePicker, Select, Input, Button, message } from "antd";

export default function ExportModal({ isOpen, setIsOpen }) {
  const { RangePicker } = DatePicker;
  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);
  const [email, setEmail] = useState("");

  const close = () => {
    setDate(null);
    setType(null);
    setEmail("");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (type === "email" && !email) {
      message.warning("Lütfen e-posta adresi girin.");
      return;
    }

    if (!date || !type) {
      message.warning("Tarih ve yazdırma tipini seçin.");
      return;
    }

    if (type === "email") {
      message.success(`E-posta gönderildi: ${email}`);
    } else {
      message.success("Yazıcıya gönderildi.");
    }

    close();
  };

  return (
    <Modal
      title="Dışa Aktar / Yazdır"
      open={isOpen}
      onCancel={close}
      footer={null}
    >
      <p>
        <strong>Tarih Aralığı Seçimi</strong>
      </p>
      <RangePicker
        style={{ width: "100%" }}
        value={date}
        onChange={(val) => setDate(val)}
      />

      <p style={{ marginTop: 12 }}>
        <strong>Yazdırma Tipi</strong>
      </p>
      <Select
        style={{ width: "100%" }}
        placeholder="Tip seçin"
        value={type}
        onChange={(val) => setType(val)}
        options={[
          { label: "Yazıcı", value: "printer" },
          { label: "E-Posta", value: "email" },
        ]}
      />

      {type === "email" && (
        <>
          <p style={{ marginTop: 12 }}>
            <strong>E-posta Adresi</strong>
          </p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
          />
        </>
      )}

      <Button
        type="primary"
        block
        style={{ marginTop: 20 }}
        onClick={handleSubmit}
      >
        {type === "email" ? "Gönder" : "Yazdır"}
      </Button>
    </Modal>
  );
}
