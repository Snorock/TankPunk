module scenes {
  export class Story01Scene extends objects.Scene {

    private _beginningBGM: createjs.AbstractSoundInstance;
    private _story: objects.Story01Obj;
    private _exitBtn: objects.Button;

    // Public Properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods

    private _animationEnded(): void {
      this._beginningBGM.stop();
      objects.Game.currentScene = config.Scene.CITY;
    }

    private _backBtnClick(): void {
      createjs.Sound.stop();
      objects.Game.currentScene = config.Scene.CITY;
    }

    // Public Methods
    // Initialize Game Variables and objects
    public Start(): void {

      // Sound
      this._beginningBGM = createjs.Sound.play("citySound");
      this._beginningBGM.loop = -1;
      this._beginningBGM.volume = 0.3;


      this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
      this._story = new objects.Story01Obj();
      this._story.on("animationend", this._animationEnded.bind(this), false);
      this.Main();
    }

    public Update(): void {
      this._story.x = 320;
      this._story.y = 240;
      this._story.Update();
    }

    // This is where the fun happens
    public Main(): void {
      // add transition to the scene
      this.addChild(this._story);

      this.addChild(this._exitBtn);

      this._exitBtn.on("click", this._backBtnClick);
    }
  }
}