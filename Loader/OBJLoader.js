import { FileLoader } from "./FileLoader.js";
import { Loader } from "./Loader.js";
import { Mesh } from "../object/Mesh.js";
import { Vec3 } from "../util/MyMath.js";

class OBJLoader extends Loader{
    load(url, onLoad){
        const scope = this;
        const loader = new FileLoader();
        loader.load(url, function(text){
            scope.parse(text, onLoad);
        });
    }

    parse(text, onLoad){
        let mesh = new Mesh();
        
        let lines = text.split('\n');
        let els, face, tIndex, nIndex, subEls;
        let n = 0;
        for (let line of lines) {
            n++;
            els = line.split(' ');
            if (els[0] === 'v') {
                mesh.verts.push(new Vec3(els[1], els[2], els[3].slice(0, els[3].length - 1)));
            }
            else if (els[0] === 'vt') {
                mesh.vt.push(new Vec3(els[2], els[3], els[4].slice(0, els[3].length - 1)));
            }
            else if (els[0] === 'vn') {
                mesh.vn.push(new Vec3(els[2], els[3], els[4].slice(0, els[3].length - 1)));
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
                mesh.faces.push(face);
                mesh.tIndexes.push(tIndex);
                mesh.nIndexes.push(nIndex);
            }
        }
        console.log('loaded # v# ', mesh.verts.length, ' f# ', mesh.faces.length);
        onLoad(mesh);
    }
}

export {OBJLoader};