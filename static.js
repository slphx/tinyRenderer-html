// 颜色
const white = "rgb(255, 255, 255)";
const red = "rgb(255, 0, 0)";
const green = "rgb(0, 255, 0)";
const blue = "rgb(0, 0, 255)";
const black = "rgb(0, 0, 0)";

const whiteV = new Vec3(255, 255, 255);
const redV = new Vec3(255, 0, 0);
const greenV = new Vec3(0, 255, 0);
const blueV = new Vec3(0, 0, 255);
const blackV = new Vec3(0, 0, 0);

const lightDir = new Vec3(0, 0, -1);

const flipVertically = true;

let zbuffer = [];

// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
