import { Mat4 } from "../util/MyMath.js";
import { Mesh } from "./Mesh.js";

class Scene{
    meshes; width; height; ViewPort; depth;
    constructor(width, height){
        this.meshes =[];
        this.width = width;
        this.height = height;
        this.depth = 255;
        this.size = this.width*this.height;
        this.culViewPort();
    }
    addMesh(mesh){
        this.meshes.push(mesh);
    }
    setWidth(width){
        this.width = width;
        this.culViewPort();
    }
    setHeight(height){
        this.height = height;
        this.culViewPort();
    }
    culViewPort(){
        this.ViewPort = new Mat4([  this.width/2, 0, 0, this.width/2,
                                    0, this.height/2, 0, this.height/2,
                                    0, 0, this.depth/2, this.depth/2,
                                    0, 0, 0, 1]);
    }
}

export {Scene};