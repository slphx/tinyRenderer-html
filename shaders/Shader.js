import { Vec4 } from "../util/MyMath.js";
import { Vec3 } from "../util/MyMath.js";

class Shader{
    constructor(type){
        if (type === 'normalTexture') this.vertex = this.vertexTangent;
    }
    init = function(scope){
        scope.def("intensity", []);
        scope.def("uv", []);
    }
    vertex = function(scope, iface, nvert){
        let mesh = scope.mesh;
        let v = mesh.verts[mesh.faces[iface][nvert]];
        v = new Vec4(v.x, v.y, v.z, 1);

        scope.get("intensity").push(Math.max(0, -mesh.getNormal(iface, nvert).dot(scope.lightDir)));
        scope.get("uv").push(mesh.getUV(iface, nvert));

        return scope.ViewPort.dot(scope.Projection.dot(scope.ModelView.dot(v)));
        
    }
    fragment = function(scope, bar, color){
        let intensity = bar.dot(scope.get("intensity"));
        let uvs = scope.get("uv");
        let uv = [bar.x*uvs[0][0] + bar.y*uvs[1][0] + bar.z*uvs[2][0],
              bar.x*uvs[0][1] + bar.y*uvs[1][1] + bar.z*uvs[2][1]];
        let diffuse = scope.mesh.getTextureByUV(uv);
        color.push(diffuse[0]*intensity, diffuse[1]*intensity, diffuse[2]*intensity);
        return false;
    }

    setVertex(vertex){
        this.vertex = vertex;
    }
    setFragment(fragment){
        this.fragment = fragment;
    }

    vertexTangent(scope, iface, nvert){
        let mesh = scope.mesh;
        let v = mesh.verts[mesh.faces[iface][nvert]];
        v = new Vec4(v.x, v.y, v.z, 1);

        let index = mesh.tIndexes[iface][nvert];
        let vt = mesh.vt[index];
        let x = vt.x, y = vt.y;
        x = Math.round(Number(x)*Number(mesh.texture.width));
        y = Math.round(Number(y)*Number(mesh.texture.height));
        let normal = mesh.nmtexture.get(x, y)
        let normalV = new Vec3(normal[0], normal[1], normal[2]);
        normalV.normalize();
        scope.get("intensity").push(Math.max(0, -normalV.dot(scope.lightDir)));

        scope.get("uv").push(mesh.getUV(iface, nvert));

        return scope.ViewPort.dot(scope.Projection.dot(scope.ModelView.dot(v)));
    }
}

export {Shader};