import {Vec2, Vec3} from "../util/MyMath.js"

class Mesh {
    verts; faces; vt; vn; tIndexes; nIndexes;
    constructor() {
        this.verts = [];
        this.faces = [];
        this.vt = [];
        this.vn = [];
        this.tIndexes = [];
        this.nIndexes = [];
    }
    nverts() {
        return this.verts.length;
    }
    nfaces() {
        return this.faces.length;
    }
    vert(i) {
        return this.verts[i];
    }
    face(i, j) {
        if (j === undefined) return this.faces[i];
        return this.faces[i][j];
    }
    tIndex(i){
        return this.tIndexes[i];
    }
    nIndex(i){
        return this.nIndexes[i];
    }
    setTexture(texture){
        this.texture = texture;
    }
    getTexture(i, n){
        let index = this.tIndexes[i][n];
        let vt = this.vt[index];
        let x = vt.x, y = vt.y;
        x = Math.round(Number(x)*Number(this.texture.width));
        y = Math.round(Number(y)*Number(this.texture.height));
        return this.texture.get(x, y);
    }
    getUV(i, n){
        let index = this.tIndexes[i][n];
        return [this.vt[index].x, this.vt[index].y];
    }
    getTextureByUV(uv){
        let x = uv[0], y = uv[1];
        x = Math.round(Number(x)*Number(this.texture.width));
        y = Math.round(Number(y)*Number(this.texture.height));
        return this.texture.get(x, y);
    }
    getNormal(i, n){
        let index = this.nIndexes[i][n];
        return this.vn[index];
    }
    projectionTransform(m){
        let newV = [];
        for (let i=0; i<this.verts.length; i++){
            let tempv = [];
            // console.log('before:', this.#verts[i]);
            for (let j=0; j<4; j++){
                tempv.push(this.verts[i].dot(m.row(j)));
            }
            
            newV.push(new Vec3(tempv[0]/tempv[3], tempv[1]/tempv[3], tempv[2]/tempv[3]));
            // console.log('after:', newV[i]);
        }
        this.verts = newV;
    }
    printv(){
        console.log(this.verts);
    }
}

export { Mesh }