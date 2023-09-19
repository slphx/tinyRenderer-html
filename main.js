import { OBJLoader } from "./Loader/OBJLoader.js";
import { TGALoader } from "./Loader/TGALoader.js";
import { Texture } from "./object/Texture.js";
import { Renderer } from "./renderer/Renderer.js";
import { Scene } from "./object/Scene.js";
import { Camera } from "./object/Camera.js";
import { Mat4 } from "./util/MyMath.js";
import { Global } from "./util/Static.js";

const tgapath = "assets/african_head_diffuse.tga";
const tgaloader = new TGALoader();

const objpath = "assets/african_head.obj";
const objloader = new OBJLoader();

const scene = new Scene();
const camera = new Camera();
const renderer = new Renderer();

let texture;

function main(){
  tgaloader.load(tgapath, function(tga){
    texture = new Texture(tga.width, tga.height, tga.data);
    objloader.load(objpath, function(obj){
      obj.setTexture(texture);
      scene.addMesh(obj);
      scene.setWidth(Global.width);
      scene.setHeight(Global.height);
    
      renderer.render(scene, camera)
      console.log('finish');
    })
  })



  // tgaloader.load(tgapath, function(object){
  //   texture = new Texture(object.width, object.height, object.data);
  //   console.log('texture:', tgapath, 'loaded');
  //   objloader.load(objpath, function(object){
  //     object.setTexture(texture);

  //     let c = 1;
  //     let projctionM = new Mat4([1, 0, 0, 0,
  //                                0, 1, 0, 0,
  //                                0, 0, 1, 0,
  //                                0, 0, -1.0/c, 1]);
  //     console.log(projctionM);
      
  //     object.projectionTransform(projctionM);
      
  //     renderer.addMesh(object);

  //     renderer.draw();
  //     console.log('object:', objpath, 'loaded');
  //     console.log('finish');
  //   });
  // });

	// function mainLoop(now) {
  // renderer.render(scene, camera)
	// 	requestAnimationFrame(mainLoop);
	// }
	// requestAnimationFrame(mainLoop);

}

main();