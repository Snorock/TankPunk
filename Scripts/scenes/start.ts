module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _gameLabel: objects.Label;
    private startBtn: objects.Button;
    private _mapBackground: objects.MapBackground;

    // Public Properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _startBtnClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
      //objects.Game.currentScene = config.Scene.CITY;
      //objects.Game.currentScene = config.Scene.DESERT;
      //objects.Game.currentScene = config.Scene.FROST;
      //objects.Game.currentScene = config.Scene.OVER;
      console.log(objects.Game.currentScene);
    }


    // Public Methods
    // Initialize Game Variables and objects
    public Start(): void {
      this._mapBackground = new objects.MapBackground(this.assetManager, "startGameBackground");
      this._gameLabel = new objects.Label("TankPunk", "45px", "jabjai", "#333333", 320, 120, true);
      this.startBtn = new objects.Button(this.assetManager, "startButton", 320, 370);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      this.addChild(this._mapBackground);
      
      // add the welcome label to the scene
      this.addChild(this._gameLabel);

      // add the startButton to the scene
      this.addChild(this.startBtn);

      this.startBtn.on("click", this._startBtnClick);
    }
  }
}