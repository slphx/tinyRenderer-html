import {Vec3} from "../util/MyMath.js";

// 颜色
const staticColor = {
    white: "rgb(255, 255, 255)",
    red: "rgb(255, 0, 0)",
    green: "rgb(0, 255, 0)",
    blue: "rgb(0, 0, 255)",
    black: "rgb(0, 0, 0)",

    whiteV: new Vec3(255, 255, 255),
    redV: new Vec3(255, 0, 0),
    greenV: new Vec3(0, 255, 0),
    blueV: new Vec3(0, 0, 255),
    blackV: new Vec3(0, 0, 0),
}

// 设置画布
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let Global = {

    width: canvas.width = 1024,
    height: canvas.height = 1024,

    lightDir: new Vec3(-1, 1, -0.6),

    zbuffer: [],
}

const Config = {
    flipVertically: true,
}

export {staticColor, Global, Config, canvas, ctx};