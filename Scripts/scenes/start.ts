module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _gameLabel: objects.Label;
    private startBtn: objects.Button;

    // Public Properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _startBtnClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods
    // Initialize Game Variables and objects
    public Start(): void {
      this._gameLabel = new objects.Label("TankPunk", "60px", "Consolas", "#000000", 320, 240, true);
      this.startBtn = new objects.Button(this.assetManager, "startBtn", 320, 340, 0.1);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._gameLabel);

      // add the startButton to the scene
      this.addChild(this.startBtn);

      this.startBtn.on("click", this._startBtnClick);
    }
  }
}