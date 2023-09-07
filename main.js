import {OBJLoader} from "./Loader/OBJLoader.js";
import {TGALoader} from "./Loader/TGALoader.js";
import { Texture } from "./object/Texture.js";
import { Renderer } from "./renderer/Renderer.js";
import { Mat4 } from "./util/MyMath.js";

const tgapath = "assets/african_head_diffuse.tga";
const tgaloader = new TGALoader();

const objpath = "assets/african_head.obj";
const objloader = new OBJLoader();
const renderer = new Renderer();

let texture;

function main(){
  tgaloader.load(tgapath, function(object){
    texture = new Texture(object.width, object.height, object.data);
    console.log('texture:', tgapath, 'loaded');
    objloader.load(objpath, function(object){
      object.setTexture(texture);

      let c = 1;
      let projctionM = new Mat4([1, 0, 0, 0,
                                 0, 1, 0, 0,
                                 0, 0, 1, 0,
                                 0, 0, -1.0/c, 1]);
      console.log(projctionM);
      
      object.projectionTransform(projctionM);
      
      renderer.addMesh(object);

      renderer.draw();
      console.log('object:', objpath, 'loaded');
      console.log('finish');
    });
  });


	// function mainLoop(now) {
  //   renderer.draw();
	// 	requestAnimationFrame(mainLoop);
	// }
	// requestAnimationFrame(mainLoop);

}

main();