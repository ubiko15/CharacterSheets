import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true, // Erlaubt Zugriffe von außen
        allowedHosts: [
            "localhost",
            ".trycloudflare.com", // Wildcard für alle Cloudflare Tunnel URLs
        ],
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
