module scenes {
    export class Story02p2Scene extends objects.Scene {
      
      private _story: objects.Story02Obj02;
      private _exitBtn: objects.Button;
  
      // Public Properties
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager);
  
        this.Start();
      }
  
      // Private Mathods
      
      private _animationEnded(): void {
        createjs.Sound.stop();
        objects.Game.currentScene = config.Scene.DESERT;
      }

      private _backBtnClick(): void {
        createjs.Sound.stop();
        objects.Game.currentScene = config.Scene.DESERT;
      }
  
      // Public Methods
      // Initialize Game Variables and objects
      public Start(): void {
        this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
        this._story = new objects.Story02Obj02();
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