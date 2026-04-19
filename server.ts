import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mock Data
  const products = [
    {
      id: "g-001",
      name: "Tactical Stealth Goggles",
      category: "Goggles",
      price: 189,
      image: "https://picsum.photos/seed/motogoggles/800/800",
      description: "Anti-fog, high-impact polycarbonate lens with triple-layer face foam.",
      specs: ["UV400 Protection", "Shatterproof", "Neon Toxic Green Accents"]
    },
    {
      id: "gl-002",
      name: "Carbon Grip Gloves",
      category: "Gloves",
      price: 124,
      image: "https://picsum.photos/seed/motogloves/800/800",
      description: "Reinforced knuckle protection with touch-screen compatible fingertips.",
      specs: ["Goat Leather", "Carbon Fiber Inserts", "Silicone Grip"]
    },
    {
      id: "h-003",
      name: "Underground Oversized Hoodie",
      category: "Hoodies",
      price: 95,
      image: "https://picsum.photos/seed/motohoodie/800/800",
      description: "Heavyweight 450GSM cotton with distressed logo prints.",
      specs: ["450GSM Cotton", "Relaxed Fit", "Hidden Tool Pocket"]
    },
    {
      id: "b-004",
      name: "Stealth Balaclava v2",
      category: "Balaclava",
      price: 45,
      image: "https://picsum.photos/seed/motobala/800/800",
      description: "Moisture-wicking technical fabric designed for under-helmet comfort.",
      specs: ["Breathable", "Flatlock Seams", "Hidden Branding"]
    }
  ];

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "HIDDEN" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HIDDEN] Server deployed at http://localhost:${PORT}`);
  });
}

startServer();
