import { Mat4, Vec3 } from "../util/MyMath.js";

const PI = 3.14159265358579;
class Camera{
    eye; center; up; fov; aspect; far; near;
    constructor(e, c, u){
        this.eye = e;
        this.center = c;
        this.up = u;
        this.fov = PI/4;
        this.aspect = 1;
        this.far = -50;
        this.near = -1e-2;
        
        this.culculate();

    }
    culculate(){
        let e = this.eye;
        let c = this.center;
        let u = this.up;
        let fov = this.fov;
        let aspect = this.aspect;
        let far = this.far;
        let near = this.near;
        
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
        let Tr = new Mat4([1,    0,    0,    -e.x, 
                           0,    1,    0,    -e.y, 
                           0,    0,    1,    -e.z, 
                           0, 0, 0, 1]);

        this.ModelView = Minv.times(Tr);

        // this.ModelView = new Mat4([1, 0, 0, e.x,
        //                            0, 1, 0, e.y,
        //                            0, 0, 1, e.z,
        //                            0, 0, 0, 1]);
                          
        this.Projection = new Mat4([-1/(aspect*Math.tan(fov/2)), 0, 0, 0,
                                    0, -1/Math.tan(fov/2), 0, 0,
                                    0, 0, (near+far)/(near-far), (-2*near*far)/(near-far),
                                    0, 0, 1, 0]);

    }
}

export {Camera};