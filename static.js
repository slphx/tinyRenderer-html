// 颜色
const staticColor = {
    white: "rgb(255, 255, 255)",
    red: "rgb(255, 0, 0)",
    green: "rgb(0, 255, 0)",
    blue: "rgb(0, 0, 255)",
    black: "rgb(0, 0, 0)",
}

const staticColorV = {
    whiteV: new Vec3(255, 255, 255),
    redV: new Vec3(255, 0, 0),
    greenV: new Vec3(0, 255, 0),
    blueV: new Vec3(0, 0, 255),
    blackV: new Vec3(0, 0, 0),
}

//
const lightDir = new Vec3(0, 0, -1);

//
const flipVertically = true;

//
let zbuffer = [];

// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

export {staticColor, staticColorV, canvas, ctx, width, height, zbuffer, l}