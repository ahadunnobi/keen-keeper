"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2200,
        style: {
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          padding: "10px 12px",
          fontSize: "14px",
        },
      }}
    />
  );
}
