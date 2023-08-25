import { Model } from "./model.js";
import { Static } from "./static.js";

function set(p, color){
  ctx.fillStyle = color;
  ctx.fillRect(p.x, p.y, 1, 1);
}

function line(p1, p2, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.fill();
}

function triangle(pts, color) {
  let bboxmin = new Vec2(width - 1, height - 1);
  let bboxmax = new Vec2(0, 0);
  let clamp = new Vec2(width - 1, height - 1);
  for (i = 0; i < 3; i++) {
      bboxmin.x = Math.max(0, Math.min(bboxmin.x, pts[i].x));
      bboxmin.y = Math.max(0, Math.min(bboxmin.y, pts[i].y));

      bboxmax.x = Math.min(clamp.x, Math.max(bboxmax.x, pts[i].x));
      bboxmax.y = Math.min(clamp.y, Math.max(bboxmax.y, pts[i].y));
  }
  let P = new Vec3(0, 0, 0);
  for (P.x = bboxmin.x; P.x <= bboxmax.x; P.x++) {
      for (P.y = bboxmin.y; P.y <= bboxmax.y; P.y++) {
          let bc_screen = barycentric(pts, P);
          if (bc_screen.x < 0 || bc_screen.y < 0 || bc_screen.z < 0) continue;
          P.z = pts[0].z*bc_screen.x;
          P.z += pts[1].z*bc_screen.y;
          P.z += pts[2].z*bc_screen.z;
          if (zbuffer[Math.round(P.x+P.y*width)]<P.z){
            zbuffer[P.x+P.y*width] = P.z;
            set(P, color);
          }
          
      }
  }
}

function loadObj(obj){
  return new Model(obj);
}
async function loadFile(url){
  let model;
  const request = new Request(url, {
    method: "GET",
  });
  await fetch(request)
  .then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then(response => {
    model = new Model(response);
  })
  .catch(error => {
    console.error(error);
  });
  return model;
}

async function draw(){
  loadFile("assets/african_head.obj")
  .then(model => {
    zbuffer.length = width*height;
    zbuffer.fill(-Number.MAX_VALUE, 0, width*height);
    for (let i=0; i<model.nfaces(); i++){
      let screen_coords = [];
      let world_coords = [];
      faceV = model.face(i);
      let face = [faceV.x, faceV.y, faceV.z]

      for (let j=0; j<3; j++){
        let v = model.vert(face[j]);
        screen_coords.push(new Vec3((Number(v.x) + 1) * width / 2, (Number(v.y) + 1) * height / 2, Number(v.z)));
        if (flipVertically === true) screen_coords[j].y = height-screen_coords[j].y;
        world_coords.push(v);
      }

      let n = world_coords[2].sub(world_coords[0]).cross(world_coords[1].sub(world_coords[0]));
      n.normalize();
      let intensity = n.dot(lightDir);
      if (intensity > 0){
        colorV = new Vec3(intensity * 255, intensity * 255, intensity * 255);
      
        triangle([screen_coords[0], screen_coords[1], screen_coords[2]], getColor(colorV));
      }

    }
  });

}
function main(){
  
  draw();

}

main();