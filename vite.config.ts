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
    rollupOptions: {
      // 如果你的库依赖其他外部模块，可以在这里配置
      external: [], // 将外部依赖排除在打包文件之外
      output: {
        globals: {
          // 外部依赖的全局变量映射
          // 示例：'react': 'React',
        },
      },
    },
  },
});
