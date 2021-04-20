import { CGFobject } from '../../../../lib/CGF.js';
import { MyTriangle } from '../../../primitives/MyTriangle.js'

export class MyTailFin extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearence) {
    super(scene);
    this.tail = new MyTriangle(scene, appearence)
    this.appearence = appearence
  }

  display() {
    this.appearence.apply()

    this.scene.pushMatrix()

    this.scene.translate(0,-0.65,-1.3)

    this.scene.rotate(-Math.PI/2 + Math.PI/4,1,0,0)


    this.scene.rotate(Math.PI/2,0,0,1)


    //this.scene.rotate(-Math.PI, 0, 1, 0)


    this.tail.display()

    this.scene.popMatrix()

    this.scene.defaultAppearance.apply()
  }
}
