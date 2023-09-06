import {OBJLoader} from "./Loader/OBJLoader.js";
import {TGALoader} from "./Loader/TGALoader.js";
import { Texture } from "./object/Texture.js";
import { Renderer } from "./renderer/Renderer.js";

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
    // renderer.drawTexture(texture);
    objloader.load(objpath, function(object){
      object.setTexture(texture);
      renderer.addMesh(object);
      console.log('object:', objpath, 'loaded');
      renderer.draw();
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