import { Vec2, Vec3, Vec4, barycentric } from "../util/MyMath.js";
import { staticColor, Global, Config, canvas, ctx } from "../util/Static.js";
import { getColor, getColorV } from "../util/util.js";
import { Shader } from "../shaders/Shader.js";

class Renderer {
    scope;
    ViewPort; Projection; ModelView; 
    variables;
    constructor(){
        this.variables = {};
    }

    render(scene, camera){
        if (scene.meshes.length ===0) return;

        this.scope = this;
        this.ViewPort = scene.ViewPort;
        this.ModelView = camera.ModelView;
        this.Projection = camera.Projection;
        this.width = scene.width;
        this.height = scene.height;
        this.lightDir = Global.lightDir;
        this.scene = scene;
        this.camera = camera;
        this.zbuffer = [];
        this.zbuffer.length = this.width*this.height;
        this.zbuffer.fill(-Number.MAX_VALUE, 0,  this.width*this.height);

        this.shader = new Shader(this.scope);
        
        
        for (let k=0; k<scene.meshes.length; k++){
            let mesh = scene.meshes[k];
            this.mesh = mesh;
            for (let i=0; i<mesh.nfaces(); i++){
                this.shader.init(this.scope);
                let screen_coords = [];
                for (let j=0; j<3; j++){
                    screen_coords.push(this.shader.vertex(this.scope, i, j));
                }

                for (let i=0; i<3; i++){
                    screen_coords[i].x/=screen_coords[i].w;
                    screen_coords[i].y/=screen_coords[i].w;
                    screen_coords[i].z/=screen_coords[i].w;
                }

                this.triangle(this.scope, screen_coords);
            }
        }
    }

    setShaderVertex(vertex){
        this.shader.vertex = vertex;
    }
    setShaderFragment(fragment){
        this.shader.fragment = fragment;
    }

    drawTexture(texture){
        for (let i=0; i<texture.width; i++){
            for (let j=0; j<texture.height; j++){
                this.set(i, texture.height - j, getColor(texture.getTexture(i, j)));
            }
        }
    }

    triangle(scope, pts) {
        const width = this.width;
        const height = this.height;
        const lightDir = this.lightDir;

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
                
                const color = new Vec3(0,0,0);
                if (!this.shader.fragment(scope, bc_screen, color)) continue;
                P.z = pts[0].z*bc_screen.x + pts[1].z*bc_screen.y + pts[2].z*bc_screen.z;
                if (this.zbuffer[Math.round(P.x+P.y*width)]<P.z){
                    this.zbuffer[P.x+P.y*width] = P.z;
                    this.set(P.x, P.y,  getColorV(color));
                }
            }
        }
    }

    set(x, y, color){
        if (Config.flipVertically === true) y = this.height-y;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }

    get(key){
        return this.variables[key];
    }

    def(key, value){
        this.variables[key] = value;
    }
}

export {Renderer};