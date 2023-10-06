import { OBJLoader } from "./Loader/OBJLoader.js";
import { TGALoader } from "./Loader/TGALoader.js";
import { Texture } from "./object/Texture.js";
import { Renderer } from "./renderer/Renderer.js";
import { Scene } from "./object/Scene.js";
import { Camera } from "./object/Camera.js";
import { Vec3 } from "./util/MyMath.js";
import { Global } from "./util/Static.js";
import { Shader } from "./shaders/Shader.js";
import { GouraudShader } from "./shaders/GouraudShader.js";
import { PhongShader } from "./shaders/PhongShader.js";

const tgapath = "assets/ge.tga";
// const nmtgapath = "assets/african_head/african_head_nm.tga";
const tantgapath = "assets/african_head/african_head_nm_tangent.tga";

const tgaloader = new TGALoader();

// const objpath = "assets/african_head/african_head.obj";
const objpath = "assets/testCube.obj";
// const objpath = "assets/cottage_obj.obj";
const objloader = new OBJLoader();

const scene = new Scene();

let eye = new Vec3(0, 2, 3);
let center = new Vec3(0, 0.4, 0);
let up = new Vec3(0, 1, 0);
const camera = new Camera(eye, center, up);
const renderer = new Renderer();
// renderer.setShader(new Shader('normalTexture'));
renderer.setShader(new GouraudShader());
// renderer.setShader(new PhongShader());


let texture, nmtexture;

function main(){
  tgaloader.load(tgapath, function(tga){
    texture = new Texture(tga.width, tga.height, tga.data);
    // tgaloader.load(nmtgapath, function(nmtga){
      // nmtexture = new Texture(nmtga.width, nmtga.height, nmtga.data);
      objloader.load(objpath, function(obj){
        obj.setTexture(texture);
        obj.nmtexture = nmtexture;
        scene.addMesh(obj);
        scene.setWidth(Global.width);
        scene.setHeight(Global.height);
        // renderer.render(scene, camera);
        // console.log('finish');
  
      })
    // })
    // renderer.drawTexture(texture);


  })
  window.onload = function(){
    document.onkeydown = function(event){
        console.log(event.code);

        switch (event.code){
          case 'KeyW':
            camera.center.y += 0.1;
            break;
          case 'KeyS':
            camera.center.y -= 0.1;
            break;
          case 'KeyA':
            camera.center.x += 0.1;
            break;
          case 'KeyD':
            camera.center.x -= 0.1;
            break;
          case 'KeyE':
            camera.eye.z += 0.1;
            break;
          case 'KeyQ':
            camera.eye.z -= 0.1;
            break;
          case 'ArrowUp':
            camera.eye.y += 0.1;
            break;
          case 'ArrowDown':
            camera.eye.y -= 0.1;
            break;
          case 'ArrowLeft':
            camera.eye.x -= 0.1;
            break;
          case 'ArrowRight':
            camera.eye.x += 0.1;
            break;
        }
        camera.culculate();

    };
  };


  let frame = 1;
	function mainLoop(now) {
    renderer.render(scene, camera);
		requestAnimationFrame(mainLoop);

    frame += 1;
    if (frame > 15) {
      console.log(1);
      frame = 1;
    }
	}
	requestAnimationFrame(mainLoop);

}

main();