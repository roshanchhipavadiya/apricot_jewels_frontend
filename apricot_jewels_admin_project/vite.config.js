import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/admin/",
  server: {
    proxy: {
      '/api': {
        target: 'https://srv963148.hstgr.cloud:10443/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Origin: 'https://apricotjewels.com',
          Referer: 'https://apricotjewels.com/'
        }
      }
    }
  }

  // server: {
  //   port: 5175, 
  // },
});