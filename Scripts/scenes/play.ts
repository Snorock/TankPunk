module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _exitBtn: objects.Button;
    private _testObject: objects.testObject;
    private _tank: objects.Tank;

    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;
    private _canShoot: boolean;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this._bulletFire = this._bulletFire.bind(this);

      this.Start();
    }

    // Private Methods
    private _backBtnClick(): void {
      objects.Game.currentScene = config.Scene.START;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._exitBtn = new objects.Button(this.assetManager, "exitBtn", 60, 25, 0.3);
      this._testObject = new objects.testObject(this.assetManager);
      this._tank = new objects.Tank(this.assetManager);

      this._bulletNum = 50;
      this._bullets = new Array<objects.Bullet>();
      this._bulletCounter = 0;
      this._canShoot = true;


      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.Bullet(this.assetManager);
        this.addChild(this._bullets[count]);
      }

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      this._testObject.Update();
      this._tank.Update();
      this._bulletFire()

      this._bullets.forEach(bullet => {
        if (managers.Collision.Check(bullet, this._testObject)) {
          this.removeChild(this._testObject);
        }
        bullet.Update();
      });

      // check collision between test object and tank
      if (managers.Collision.Check(this._tank, this._testObject)) {
        objects.Game.currentScene = config.Scene.CITY;
      }

    }

    // This is where the fun happens
    public Main(): void {

      // add the testObject to the scene
      this.addChild(this._testObject);

      // add the tank to the scene
      this.addChild(this._tank);


      // add the backButton to the scene
      this.addChild(this._exitBtn);

      this._exitBtn.on("click", this._backBtnClick);
    }
    private _bulletFire(): void {
      if (this._canShoot) {
        let shot = false;
        if (objects.Game.keyboardManager.shootLeft) {
          this._bullets[this._bulletCounter].shootLeft(this._tank.x,this._tank.y);
        }
        else if (objects.Game.keyboardManager.shootRight) {
          this._bullets[this._bulletCounter].shootRight(this._tank.x,this._tank.y);
        }
        else if (objects.Game.keyboardManager.shootForward) {
          this._bullets[this._bulletCounter].shootForward(this._tank.x,this._tank.y);
        }
        else if (objects.Game.keyboardManager.shootBackward) {
          this._bullets[this._bulletCounter].shootBack(this._tank.x,this._tank.y);
        }

        if (shot){
          this._canShoot = false;
          this._bulletCounter++;
          if (this._bulletCounter >= this._bulletNum - 1) {
            this._bulletCounter = 0;
          }
        }
      }
      else {
        this._canShoot = true;
      }
    }
  }
}

