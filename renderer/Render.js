import { Vec2, Vec3, barycentric } from "../util/MyMath.js";
import { staticColor, Global, Config, canvas, ctx } from "../util/Static.js";
import { getColor } from "../util/util.js";

class Render {

    constructor(){

    }
    draw(mesh){
        const zbuffer = Global.zbuffer;
        const width = Global.width;
        const height = Global.height;
        const lightDir = Global.lightDir;

        zbuffer.length = width*height;
        zbuffer.fill(-Number.MAX_VALUE, 0, width*height);
        for (let i=0; i<mesh.nfaces(); i++){
          let screen_coords = [];
          let world_coords = [];
          let faceV = mesh.face(i);
          let face = [faceV.x, faceV.y, faceV.z]
    
          for (let j=0; j<3; j++){
            let v = mesh.vert(face[j]);
            screen_coords.push(new Vec3((Number(v.x) + 1) * width / 2, (Number(v.y) + 1) * height / 2, Number(v.z)));
            if (Config.flipVertically === true) screen_coords[j].y = height-screen_coords[j].y;
            world_coords.push(v);
          }
    
          let n = world_coords[2].sub(world_coords[0]).cross(world_coords[1].sub(world_coords[0]));
          n.normalize();
          let intensity = n.dot(lightDir);
          if (intensity > 0){
            let colorV = new Vec3(intensity * 255, intensity * 255, intensity * 255);
          
            this.triangle([screen_coords[0], screen_coords[1], screen_coords[2]], getColor(colorV));
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
                    this.set(P, color);
                }
                
            }
        }
    }

    set(p, color){
        ctx.fillStyle = color;
        ctx.fillRect(p.x, p.y, 1, 1);
    }

    addMesh(object){
        if (this.meshes === undefined) {
            this.meshes = [];
        }
        this.meshes.push(object);
    }
}

export {Render};