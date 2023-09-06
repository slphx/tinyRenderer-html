import {Vec2, Vec3} from "../util/MyMath.js"

class Mesh {
    #verts; #faces; #vt; #vn; #tIndexes; #nIndexes;
    constructor(obj) {
        this.#verts = [];
        this.#faces = [];
        this.#vt = [];
        this.#vn = [];
        this.#tIndexes = [];
        this.#nIndexes = [];

        let lines = obj.split('\n');
        let els, face, tIndex, nIndex, subEls;
        let n = 0;
        for (let line of lines) {
            n++;
            els = line.split(' ');
            if (els[0] === 'v') {
                this.#verts.push(new Vec3(els[1], els[2], els[3].slice(0, els[3].length - 1)));
            }
            else if (els[0] === 'vt') {
                this.#vt.push(new Vec3(els[2], els[3], els[4].slice(0, els[3].length - 1)));
            }
            else if (els[0] === 'vn') {
                this.#vn.push(new Vec3(els[2], els[3], els[4].slice(0, els[3].length - 1)));
            }
            else if (els[0] === 'f') {
                face = [];
                tIndex = [];
                nIndex = [];
                for (let i=1; i<=3; i++){
                    subEls = els[i].split('/');
                    face.push(subEls[0]);
                    tIndex.push(subEls[1]);
                    if (i==3) nIndex.push(subEls[2].slice(0, subEls[2].length - 1));
                    else nIndex.push(subEls[2]);
                }
                this.#faces.push(face);
                this.#tIndexes.push(tIndex);
                this.#nIndexes.push(nIndex);
            }
        }
        console.log('loaded # v# ', this.#verts.length, ' f# ', this.#faces.length);
    }
    nverts() {
        return this.#verts.length;
    }
    nfaces() {
        return this.#faces.length;
    }
    vert(i) {
        return this.#verts[i];
    }
    face(i) {
        return this.#faces[i];
    }
    tIndex(i){
        return this.#tIndexes[i];
    }
    nIndex(i){
        return this.#nIndexes[i];
    }
    setTexture(texture){
        this.texture = texture;
    }
    getTexture(index){
        index--;
        let vt = this.#vt[index];
        let x = vt.x, y = vt.y;
        x = Math.round(Number(x)*Number(this.texture.width));
        y = Math.round(Number(y)*Number(this.texture.height));
        return this.texture.getTexture(x, y);
    }
    getNormal(index){
        index--;
        return this.#vn[index];
    }
}

export { Mesh }