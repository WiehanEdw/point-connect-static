import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "On Point Electrical — Your Electrical Connection" },
      {
        name: "description",
        content:
          "On Point Electrical — Professional, reliable electrical services across Limpopo and Gauteng, South Africa.",
      },
      { property: "og:title", content: "On Point Electrical — Your Electrical Connection" },
      {
        property: "og:description",
        content:
          "Professional, reliable electrical services across Limpopo and Gauteng, South Africa.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", background: "#0A1628", color: "#fff" }}>
      Loading On Point Electrical…
    </div>
  );
}
