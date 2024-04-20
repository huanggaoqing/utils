import { GetImageByBase64 } from "./index.type";

/*
 * @Author: huanggaoqing 3359793508@qq.com
 * @Date: 2024-04-20 12:42:13
 * @LastEditors: huanggaoqing 3359793508@qq.com
 * @LastEditTime: 2024-04-20 12:53:11
 * @FilePath: /js-utilibs/src/image/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
function getUrlBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let img: HTMLImageElement = new Image();
    img.crossOrigin = "Anonymous"; //开启img的“跨域”模式
    img.src = url;
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx?.drawImage(img, 0, 0, img.width, img.height); //参数可自定义
      const dataURL = canvas.toDataURL("image/jpeg", 1); //获取Base64编码
      resolve(dataURL);
      canvas.remove() //清除canvas元素
      img.remove(); //清除img元素
    };
    img.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };
  });
}

export function getImageByBase64(): GetImageByBase64 {
  const cacheMap = new Map()
  return async (img: string) => {
    if (cacheMap.has(img)) {
      return cacheMap.get(img)
    } else {
      const imageSrc = await getUrlBase64(img)
      cacheMap.set(img, imageSrc)
      return imageSrc
    }
  }
}

/**
 * video截取第一帧视频
 * @param {string} src video link
 * @returns 第一帧数据
 */
export function videoToCanvas(src: string): Promise<Uint8ClampedArray> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.setAttribute('preload', 'auto');
    video.setAttribute("crossorigin", "anonymous")
    video.addEventListener('loadeddata', function () {
      const canvas = document.createElement('canvas');
      canvas.height = this.videoHeight
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
      }
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
      let imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height); // 原始像素数据
      resolve(imageData!.data)
    });
    video.src = src;
  })
}

/**
 * 比对第一帧视频数据
 * @param {string} targetVideo 目标video
 * @param {string} video 要比对的video
 * @param {number} seed 随机种子
 * @returns 是否匹配
 */
export async function diffVideo(targetVideo: string, video: string, seed: number): Promise<boolean> {
  const data = await videoToCanvas(targetVideo)
  const data1 = await videoToCanvas(video)
  const targetVideoData: number[] = []
  const videoData: number[] = []
  for (var i = 0; i < seed; i++) {
    const idx = Math.floor(Math.random() * (Math.min(data.length, data1.length) - 1))
    targetVideoData.push(data[idx])
    videoData.push(data1[idx])
  }
  for (let i = 0; i < targetVideoData.length; i++) {
    if (targetVideoData[i] !== videoData[i]) {
      return false
    }
  }
  return true
}
