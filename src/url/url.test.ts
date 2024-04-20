/*
 * @Author: huanggaoqing huanggaoqing@bodypark.ai
 * @Date: 2022-08-05 19:14:36
 * @LastEditors: huanggaoqing huanggaoqing@bodypark.ai
 * @LastEditTime: 2022-08-05 19:37:46
 * @FilePath: /rollupDome/src/url/urlParams.test.ts
 * @Description: parsetUrlParams单测
 * 
 * Copyright (c) 2022 by huanggaoqing huanggaoqing@bodypark.ai, All Rights Reserved. 
 */
import { parsetUrlParams, formatUrlParams } from ".";

test("parsetUrlParams methods", () => {
  const url = "https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%8E%98%E9%87%91&fenlei=256&rsv_pq=c004ec00000004bc&rsv_t=cd3epzSszbfJaHATSNTikKvvj9exJr4cCZwdOdjvZbiq4XtpQksLlvKrjdQ&rqlang=cn&rsv_enter=1&rsv_dl=ih_1&rsv_sug3=1&rsv_sug1=1&rsv_sug7=001&rsv_sug2=0&rsv_btype=i&rsp=1&rsv_sug9=es_2_1&inputT=628&rsv_sug4=2757&rsv_sug=9"
  expect(parsetUrlParams(url)).toMatchInlineSnapshot(`
Object {
  "f": "3",
  "fenlei": "256",
  "ie": "utf-8",
  "inputT": "628",
  "rqlang": "cn",
  "rsp": "1",
  "rsv_bp": "1",
  "rsv_btype": "i",
  "rsv_dl": "ih_1",
  "rsv_enter": "1",
  "rsv_idx": "1",
  "rsv_pq": "c004ec00000004bc",
  "rsv_sug": "9",
  "rsv_sug1": "1",
  "rsv_sug2": "0",
  "rsv_sug3": "1",
  "rsv_sug4": "2757",
  "rsv_sug7": "001",
  "rsv_sug9": "es_2_1",
  "rsv_t": "cd3epzSszbfJaHATSNTikKvvj9exJr4cCZwdOdjvZbiq4XtpQksLlvKrjdQ",
  "tn": "baidu",
  "wd": "%E6%8E%98%E9%87%91",
}
`)
})

test("formatUrlParams methods", () => {
  const data = {
    name: "HGQ",
    age: 20
  }
  expect(formatUrlParams(data)).toMatchInlineSnapshot(`"name=HGQ&age=20"`)
})
