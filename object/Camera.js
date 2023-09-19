import { Mat4, Vec3 } from "../util/MyMath.js";

class Camera{
    eye; center; up;
    constructor(e, c, u){
        this.eye = e;
        this.center = c;
        this.up = u;
        
        let z = e.sub(c);
        z.normalize();
        let x = u.cross(z);
        x.normalize();
        let y = z.cross(x);
        y.normalize();
        let Minv = new Mat4([x.x, x.y, x.z, 0, 
                             y.x, y.y, y.z, 0, 
                             z.x, z.y, z.z, 0, 
                             0,   0,   0,   1]);
        let Tr = new Mat4([1,    0,    0,    0, 
                           0,    1,    0,    0, 
                           0,    0,    1,    0, 
                           -e.x, -e.y, -e.z, 1]);

        this.ModelView = Minv.times(Tr);
        this.Projection = new Mat4([1, 0, 0, 0,
                                    0, 1, 0, 0,
                                    0, 0, 1, 0,
                                    0, 0, -1.0/(e.sub(c)).norm(), 1]);

    }
}

export {Camera};