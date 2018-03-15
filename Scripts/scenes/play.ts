module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _exitBtn: objects.Button;
    private _testObject: objects.testObject;
    private _tank: objects.Tank;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

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

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      this._testObject.Update();
      this._tank.Update();

      // check collision between test object and tank
      managers.Collision.Check(this._tank, this._testObject);
      
      if(this._testObject.isColliding == true){
        objects.Game.currentScene = config.Scene.OVER;
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
  }
}
