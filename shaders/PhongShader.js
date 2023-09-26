import { Shader } from "./Shader.js";
import { Vec4 } from "../util/MyMath.js";


class PhongShader extends Shader{
    constructor(){
        super();

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
        
         // n = scope.Projection.times(scope.ModelView).dot(uv);
        let diffuse = scope.mesh.getTextureByUV(uv);
        color.push(diffuse[0]*intensity, diffuse[1]*intensity, diffuse[2]*intensity);
        return false;
    }
}
export {PhongShader};