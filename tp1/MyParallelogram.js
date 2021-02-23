import {CGFobject} from '../lib/CGF.js';

/**
 * My Parallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            0, 0, 0,  //0
            2, 0, 0,  //1
            3, 1, 0,  //2
            1, 1, 0,  //3
            
        ];
        
        this.indices = [
            0, 1, 2,
            2, 3, 0,
            3, 2, 0,
            2, 1, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}