

class Texture{
    constructor(width, height, texture) {
        this.width = width;
        this.height = height;
        this.texture = texture;
    }
    setTexture(texture){
        this.texture = texture;
        return this;
    }
    setWidth(width){
        this.width = width;
        return this;
    }
    setHeight(height){
        this.height = height;
        return this;
    }
    get(y, x){
        x = this.width - x;
        let s = 4*(Number(x)*Number(this.width)+Number(y));
        return [this.texture[s], this.texture[s+1], this.texture[s+2], this.texture[s+3]];
    }
}

export {Texture};