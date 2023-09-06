import { Vec2, Vec3, barycentric } from "../util/MyMath.js";
import { staticColor, Global, Config, canvas, ctx } from "../util/Static.js";
import { getColor, getColorV } from "../util/util.js";

class Renderer {

    constructor(){
        this.meshes = [];
    }
    draw(){
        let mesh = this.meshes[0];

        if (mesh == undefined) return;
        const zbuffer = Global.zbuffer;
        const width = Global.width;
        const height = Global.height;
        const lightDir = Global.lightDir;

        zbuffer.length = width*height;
        zbuffer.fill(-Number.MAX_VALUE, 0, width*height);
        for (let i=0; i<mesh.nfaces(); i++){
        // for (let i=0; i<100; i++){
        
          let screen_coords = [];
          let world_coords = [];
          let face = mesh.face(i);

        //   let target = 100;
        //   let f = false;

          for (let j=0; j<3; j++){
            let v = mesh.vert(face[j]-1);

            // if (Number(face[j])===target) f = true;

            screen_coords.push(new Vec3((Number(v.x) + 1) * width / 2, (Number(v.y) + 1) * height / 2, Number(v.z)));
            if (Config.flipVertically === true) screen_coords[j].y = height-screen_coords[j].y;
            world_coords.push(v);
          }

        //   if (!f) continue;
        //   console.log('haha');

          let n = world_coords[2].sub(world_coords[0]).cross(world_coords[1].sub(world_coords[0]));
          n.normalize();
          let intensity = n.dot(lightDir);
          if (intensity > 0){
            
            if (mesh.texture === undefined){
                let color;
                color = [intensity * 255, intensity * 255, intensity * 255];
                this.triangle(screen_coords, getColor(color));
            } else {
                let tIndex = mesh.tIndex(i);
                let nIndex = mesh.nIndex(i);
                let colors = [];
                let normals = [];
                for (let k=0; k<3; k++){
                    colors.push(mesh.getTexture(tIndex[k]));
                    normals.push(mesh.getNormal(nIndex[k]));
                }
                this.barycentricTriangle(screen_coords, colors, normals);

            }
          }
        }
    }

    drawTexture(texture){
        for (let i=0; i<texture.width; i++){
            for (let j=0; j<texture.height; j++){
                this.set(i, j, getColor(texture.getTexture(i, j)));
            }
        }
    }

    triangle(pts, color) {
        const zbuffer = Global.zbuffer;
        const width = Global.width;
        const height = Global.height;
        const lightDir = Global.lightDir;

        let bboxmin = new Vec2(width - 1, height - 1);
        let bboxmax = new Vec2(0, 0);
        let clamp = new Vec2(width - 1, height - 1);
        for (let i = 0; i < 3; i++) {
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
                    this.set(P.x, P.y, color);
                }
                
            }
        }
    }

    barycentricTriangle(pts, colors, normals) {
        const zbuffer = Global.zbuffer;
        const width = Global.width;
        const height = Global.height;
        const lightDir = Global.lightDir;

        let bboxmin = new Vec2(width - 1, height - 1);
        let bboxmax = new Vec2(0, 0);
        let clamp = new Vec2(width - 1, height - 1);
        for (let i = 0; i < 3; i++) {
            bboxmin.x = Math.round(Math.max(0, Math.min(bboxmin.x, pts[i].x)));
            bboxmin.y = Math.round(Math.max(0, Math.min(bboxmin.y, pts[i].y)));

            bboxmax.x = Math.round(Math.min(clamp.x, Math.max(bboxmax.x, pts[i].x)));
            bboxmax.y = Math.round(Math.min(clamp.y, Math.max(bboxmax.y, pts[i].y)));
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
                    let color = [];
                    let normal = [];
                    normal.push(normals[0].x*bc_screen.x + normals[1].x*bc_screen.y + normals[2].x*bc_screen.z);
                    normal.push(normals[0].y*bc_screen.x + normals[1].y*bc_screen.y + normals[2].y*bc_screen.z);
                    normal.push(normals[0].z*bc_screen.x + normals[1].z*bc_screen.y + normals[2].z*bc_screen.z);
                    normal = new Vec3(normal[0], normal[1], normal[2]);
                    let intensity = -normal.dot(lightDir);
                    for (let k=0; k<3; k++){
                        color.push(Math.round((colors[0][k]*bc_screen.x+colors[1][k]*bc_screen.y+colors[2][k]*bc_screen.z))*intensity);
                    }
                    this.set(P.x, P.y, getColor(color));
                }
                
            }
        }
    }

    set(x, y, color){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }

    addMesh(object){
        this.meshes.push(object);
    }
}

export {Renderer};