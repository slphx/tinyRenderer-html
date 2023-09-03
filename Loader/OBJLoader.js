import { FileLoader } from "./FileLoader.js";
import { Loader } from "./Loader.js";
import { Mesh } from "../object/Mesh.js";

class OBJLoader extends Loader{
    load(url, onLoad){
        const scope = this;
        const loader = new FileLoader();
        loader.load(url, function(text){
            scope.parse(text, onLoad);
        });
    }

    parse(text, onLoad){
        let object = new Mesh(text);
        console.log(object);
        onLoad(object);
        return object;
    }
}

export {OBJLoader};