module objects {
  export class Tank extends objects.GameObject {
    // private instance variables
    private spawnRoom: number;

    // public properties
    public tankFlash: objects.TankFlash;

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "dark-tank");
      this.Start();
    }

    // private methods
    private _animationEnded(): void {
      if (this.alpha == 0) {
        this.alpha = 1;
        this.tankFlash.alpha = 0;
      }
    }

    // public methods

    // Initializes variables and creates new objects
    public Start(): void {
      this.tankFlash = new objects.TankFlash();
      this.tankFlash.alpha = 0;
      this.tankFlash.on("animationend", this._animationEnded.bind(this), false);

      this.x = 25;
      this.y = 434;
      //this.rotation = -90;
    }

    // updates the game object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    // reset the objects location to some value
    public Reset(): void {

    }

    // move the object to some new location
    public Move(): void {
      //Speed
      const speed: number = 1.5;
      // keyboard controls
      if (objects.Game.keyboardManager.moveLeft) {
        this.x -= speed;
        this.rotation = -90;
      }

      else if (objects.Game.keyboardManager.moveRight) {
        this.x += speed;
        this.rotation = 90;
      }
      else if (objects.Game.keyboardManager.moveForward) {
        this.y -= speed;
        this.rotation = 0;
      }

      else if (objects.Game.keyboardManager.moveBackward) {
        this.y += speed;
        this.rotation = 180;
      }

      this.tankFlash.rotation = this.rotation;
      this.tankFlash.x = this.x;
      this.tankFlash.y = this.y;
    }

    // check to see if some boundary has been passed
    public CheckBounds(): void {
      // right boundary
      if (this.x >= 640 - this.halfWidth) {
        this.x = 640 - this.halfWidth;
      }

      // left boundary
      else if (this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      if (this.y >= 480 - this.halfHeight) {
        this.y = 480 - this.halfHeight;
      }

      else if (this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }
  }
}
