/*
 * @Author: huanggaoqing 3359793508@qq.com
 * @Date: 2024-04-20 12:24:15
 * @LastEditors: huanggaoqing 3359793508@qq.com
 * @LastEditTime: 2024-04-20 13:06:51
 * @FilePath: /js-utilibs/rollup.config.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser"
import cleanup from "rollup-plugin-cleanup"

export default {
  input: "src/index.ts", // 打包入口
  output: [
    {
      // 打包出口
      file: "dist/index.mjs",
      format: "esm", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
      name: "utils", // cdn方式引入时挂载在window上面用的就是这个名字
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
      name: "utils", // cdn方式引入时挂载在window上面用的就是这个名字
      sourcemap: true,
      external: ["src/image/index.ts"],
    }
  ],
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块 
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    babel({ babelHelpers: "bundled" }), // babel配置,编译es6
    terser(), // 代码压缩
    cleanup() // remove 无用代码
  ],
};
