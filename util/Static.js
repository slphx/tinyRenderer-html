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

const Global = {

    width: canvas.width = window.innerWidth,
    height: canvas.height = window.innerHeight,

    lightDir: new Vec3(0, 0, -1),

    zbuffer: [],
}

const Config = {
    flipVertically: true,
}

export {staticColor, Global, Config, canvas, ctx};