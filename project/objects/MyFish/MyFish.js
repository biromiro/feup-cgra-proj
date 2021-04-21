import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyBodyElipsoid } from './components/MyBodyElipsoid.js'
import { MyRightEye } from './components/MyRightEye.js'
import { MyLeftEye } from './components/MyLeftEye.js'
import { MyTailFin } from './components/MyTailFin.js'
import { MyTopFin} from './components/MyTopFin.js'
import { MyRightFin } from './components/MyRightFin.js'
import { MyLeftFin } from './components/MyLeftFin.js'


/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyFish extends CGFobject {
  constructor(scene, appearance) {
    super(scene)

    this.appearance = appearance
    this.fishColor = [0.25,0.416,0.592, 1.0]

    this.setBody()
    this.setEyes()
    this.setFins()

    this.shader = new CGFshader(this.scene.gl, "./shaders/MyFish.vert", "./shaders/MyFish.frag")
    console.log(`position = ${this.scene.lights[0].position}`)
    this.shader.setUniformsValues({fishColor: this.fishColor, lightPosition: this.scene.lights[0].position})
  }

  update(){
    this.shader.setUniformsValues({fishColor: this.fishColor, lightPosition: this.scene.lights[0].position})
  }

  setBody(){

    this.bodyAppearance = new CGFappearance(this.scene);
		this.bodyAppearance.setAmbient(0,0,0,1);
		this.bodyAppearance.setDiffuse(1,1,1,1);
		this.bodyAppearance.setSpecular(0,0,0,0);
    this.bodyAppearance.setShininess(10)

    this.texture = new CGFtexture(this.scene, "./images/fish_tex.jpg")
    this.bodyAppearance.setTexture(this.texture);
    this.bodyAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    this.body = new MyBodyElipsoid(this.scene, this.bodyAppearance)

  }

  setEyes(){

    this.eyeBlackAppearance = new CGFappearance(this.scene)
		this.eyeBlackAppearance.setAmbient(0,0,0,1);
		this.eyeBlackAppearance.setDiffuse(0,0,0,1);
		this.eyeBlackAppearance.setSpecular(0,0,0,0);
    this.eyeBlackAppearance.setShininess(10)

    this.eyeWhiteAppearance = new CGFappearance(this.scene)
		this.eyeWhiteAppearance.setAmbient(0,0,0,1);
		this.eyeWhiteAppearance.setDiffuse(1,1,1,1);
		this.eyeWhiteAppearance.setSpecular(0,0,0,0);
    this.eyeWhiteAppearance.setShininess(10)

    this.rightEye = new MyRightEye(this.scene, this.eyeWhiteAppearance, this.eyeBlackAppearance)
    this.leftEye = new MyLeftEye(this.scene, this.eyeWhiteAppearance, this.eyeBlackAppearance)
  }

  setFins(){

    const [r,g,b,a] = this.fishColor

    this.finsAppearance = new CGFappearance(this.scene)
		this.finsAppearance.setAmbient(r,g,b,a);
		this.finsAppearance.setDiffuse(r,g,b,a);
		this.finsAppearance.setSpecular(r,g,b,a);
    this.finsAppearance.setShininess(10)

    this.tailFin = new MyTailFin(this.scene, this.finsAppearance)
    this.topFin = new MyTopFin(this.scene, this.finsAppearance)
    this.rightFin = new MyRightFin(this.scene, this.finsAppearance)
    this.leftFin = new MyLeftFin(this.scene, this.finsAppearance)
  }

  display(){
    
    this.scene.pushMatrix()

    this.scene.scale(0.5,0.5,0.5)

    this.scene.setActiveShader(this.shader)

    this.body.display()

    this.scene.setActiveShader(this.scene.defaultShader)

    this.tailFin.display()
    this.topFin.display()
    this.rightFin.display()
    this.leftFin.display()


    this.rightEye.display()
    this.leftEye.display()
 
    this.scene.popMatrix();



  }
}