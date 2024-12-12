import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "packages",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 库的入口文件
      name: "PlatON-tools", // 全局变量名
      fileName: (format) => `platon-tools.${format}.js`, // 输出文件名
      formats: ["umd", "es"], // 输出格式
    },
  },
});
