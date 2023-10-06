import { FileLoader } from "./FileLoader.js";
import { Loader } from "./Loader.js";
import { Mesh } from "../object/Mesh.js";
import { Vec3 } from "../util/MyMath.js";

class OBJLoader extends Loader{
    load(url, onLoad){
        console.log('load', url);
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
            els = [];
            let i=0; let j=0;
            while (i < line.length){
                while ((line[i] === ' ' || line[i] === '\r') && i < line.length) i++;
                j = i;
                while ((line[i] != ' ' && line[i] != '\r') && i < line.length) i++;
                els.push(line.slice(j, i));
            }

            if (els[0] === 'v') {
                mesh.verts.push(new Vec3(els[1], els[2], els[3]));
            }
            else if (els[0] === 'vt') {
                mesh.vt.push(new Vec3(els[1], els[2]));
            }
            else if (els[0] === 'vn') {
                mesh.vn.push(new Vec3(els[1], els[2], els[3]));
            }
            else if (els[0] === 'f') {
                face = [];
                tIndex = [];
                nIndex = [];
                for (let i=1; i<=4; i++){
                    subEls = els[i].split('/');
                    face.push(subEls[0] - 1);
                    tIndex.push(subEls[1] - 1);
                    nIndex.push(subEls[2] - 1);
                }
                
                mesh.faces.push(face);
                mesh.tIndexes.push(tIndex);
                mesh.nIndexes.push(nIndex);
            }
        }
        
        if (mesh.faces[0][3] != -1) mesh.type = 4; else mesh.type = 3;
        // console.log(mesh.faces[0][3]);
        console.log('loaded # v# ', mesh.verts.length, ' f# ', mesh.faces.length);
        onLoad(mesh);
    }
}

export {OBJLoader};