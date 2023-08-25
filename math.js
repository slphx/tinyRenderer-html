class Vec2{
    x; y;
    constructor(x, y){
      this.x = x; this.y = y;
    }
    normalize(){
        let l = Math.sqrt(this.x**2 + this.y**2);
        this.x /= l;
        this.y /= l;
    }
}

class Vec3{
    x; y; z;
    constructor(x, y, z){
        this.x = x; this.y = y; this.z = z;
    }
    plus(v){
        return new Vec3(this.x+v.x, this.y+v.y, this.z+v.z);
    }
    sub(v){
        return new Vec3(this.x-v.x, this.y-v.y, this.z-v.z);
    }
    dot(v){
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }
    cross(v){
        return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    normalize(){
        let l = Math.sqrt(this.x**2 + this.y**2 + this.z**2);
        this.x /= l;
        this.y /= l;
        this.z /= l;
    }
}

function barycentric(pts, P) {
    let s1 = new Vec3(pts[2].x-pts[0].x, pts[1].x-pts[0].x, pts[0].x-P.x);
    let s2 = new Vec3(pts[2].y-pts[0].y, pts[1].y-pts[0].y, pts[0].y-P.y);
    let u = s1.cross(s2);
    if (Math.abs(u.z) > 1e-2) return new Vec3(1-(u.x+u.y)/u.z, u.y/u.z, u.x/u.z);
    return new Vec3(-1,1,1);

    // 2 dimention
    // let u = new Vec3(pts[2].x - pts[0].x, pts[1].x - pts[0].x, pts[0].x - P.x).cross(new Vec3(pts[2].y - pts[0].y, pts[1].y - pts[0].y, pts[0].y - P.y));
    // /* `pts` and `P` has integer value as coordinates
    //    so `abs(u[2])` < 1 means `u[2]` is 0, that means
    //    triangle is degenerate, in this case return something with negative coordinates */
    // if (Math.abs(u.z) < 1e-2) return new Vec3(-1, 1, 1);
    // return new Vec3(1 - (u.x + u.y) / u.z, u.y / u.z, u.x / u.z);
}

export {Vec2, Vec3, barycentric};