module objects {
  export class Tank extends objects.GameObject {
    // private instance variables
    
    // public properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "tank");
      this.Start();
    }

    // private methods

    // public methods

    // Initializes variables and creates new objects
    public Start():void {
      this.y = 430;
    }

    // updates the game object every frame
    public Update():void {
      this.Move();
      this.CheckBounds();
    }

    // reset the objects location to some value
    public Reset():void {

    }

    // move the object to some new location
    public Move():void {
      //Speed
      const speed: number = 5;
        // keyboard controls
     if(objects.Game.keyboardManager.moveLeft) {
      this.x -= speed;
      this.rotation = -90;
    }

    else if(objects.Game.keyboardManager.moveRight) {
      this.x += speed;
      this.rotation = 90;
    }
    else if(objects.Game.keyboardManager.moveForward) {
      this.y -= speed;
      this.rotation = 0;
    }

    else if(objects.Game.keyboardManager.moveBackward) {
      this.y += speed;
      this.rotation = 180;
    }
    }

    // check to see if some boundary has been passed
    public CheckBounds():void {
      // right boundary
      if(this.x >= 640 - this.halfWidth) {
        this.x = 640 - this.halfWidth;
      }

      // left boundary
      else if(this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      if(this.y >= 480 - this.halfHeight) {
        this.y = 480 - this.halfHeight;
      }

      else if(this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }
  }
}
