module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _backButton: objects.Button;
    private _mapBackground: objects.MapBackground;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _backButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._mapBackground = new objects.MapBackground(this.assetManager, "gameOverBackground");
      this._overLabel = new objects.Label("Game Over", "45px", "jabjai", "#333333", 320, 120, true);
      this._backButton = new objects.Button(this.assetManager, "backButton", 320, 370);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      this.addChild(this._mapBackground);

      // add the welcome label to the scene
      this.addChild(this._overLabel);

      // add the backButton to the scene
      this.addChild(this._backButton);

      // event listeners
      this._backButton.on("click", this._backButtonClick);
    }
  }
}
