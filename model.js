import * as Math from "./math.js"

class Model{
    #verts; #faces;
    constructor(obj){
        this.#verts = [];
        this.#faces = [];

        let lines = obj.split('\n');
        let n = 0;
        for (let line of lines){
            n++;
            let els = line.split(' ');
            if (els[0] === 'v'){
                this.#verts.push(new Math.Vec3(els[1], els[2], els[3].slice(0, els[3].length-1)));
            } 
            else if (els[0] === 'f'){
                this.#faces.push(new Math.Vec3(els[1].split('/')[0]-1, els[2].split('/')[0]-1, els[3].split('/')[0].slice(0, els[3].length-1)-1));
            }
        }
        console.log('loaded # v# ', this.#verts.length, ' f# ', this.#faces.length);
    }
    nverts(){
        return this.#verts.length;
    }
    nfaces(){
        return this.#faces.length;
    }
    vert(i){
        return this.#verts[i];
    }
    face(i){
        return this.#faces[i];
    }
}

export { Model };