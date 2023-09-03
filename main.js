import {OBJLoader} from "./loader/OBJLoader.js";
import { Render } from "./renderer/Render.js";

const path = "assets/african_head.obj";
const loader = new OBJLoader();
const render = new Render();


function main(){
  loader.load(path, function(object){
    render.addMesh(object);
    render.draw(render.meshes[0]);
  });




}

main();