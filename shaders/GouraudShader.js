import { Shader } from "./Shader.js";
import { Vec4 } from "../util/MyMath.js";

class GouraudShader extends Shader{
    constructor(type){
        super();

        if (type === 1) { this.fragment = this.fragment1;}
    }
    vertex = function(scope, iface, nvert){
        
        let mesh = scope.mesh;
        let v = mesh.verts[mesh.faces[iface][nvert]];
        v = new Vec4(v.x, v.y, v.z, 1);
        scope.get("intensity").push(Math.max(0, mesh.getNormal(iface, nvert).dot(scope.lightDir)));

        return scope.ViewPort.dot(scope.Projection.dot(scope.ModelView.dot(v)));
        
    }
    fragment = function(scope, bar, color){
        let intensity = bar.dot(scope.get("intensity"));
        color.push(150*intensity+50, 150*intensity+50, 150*intensity+50);
        return false;
    }

    fragment1(scope, bar, color){
        let intensity = bar.dot(scope.get("intensity"));
        if (intensity>.85) intensity = 1;
        else if (intensity>.60) intensity = .80;
        else if (intensity>.45) intensity = .60;
        else if (intensity>.30) intensity = .45;
        else if (intensity>.15) intensity = .30;
        else intensity = 0;
        color.push(255*intensity, 255*intensity, 255*intensity);
        return false;

    }

}

export {GouraudShader};