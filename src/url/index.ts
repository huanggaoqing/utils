/*
 * @Author: huanggaoqing 3359793508@qq.com
 * @Date: 2024-04-20 12:24:15
 * @LastEditors: huanggaoqing 3359793508@qq.com
 * @LastEditTime: 2024-04-20 13:03:39
 * @FilePath: /js-utilibs/src/url/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export function parsetUrlParams<T>(url: string): T {
	let paramsStr = url.split("?")[1];
	return Object.fromEntries(
		paramsStr
			.split("&")
			.map(item => item.split("="))
	)
}

export function formatUrlParams<T extends Object>(data: T): string {
	const dataArr = Object.entries(data);
	return dataArr.map(item => item.join("=")).join("&")
}
