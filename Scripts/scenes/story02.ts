module scenes {
    export class Story02Scene extends objects.Scene {
      
      private _beginningBGM: createjs.AbstractSoundInstance;
      private _story: objects.Story02Obj;
  
      // Public Properties
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager);
  
        this.Start();
      }
  
      // Private Mathods

      private _animationEnded(): void {
        objects.Game.currentScene = config.Scene.STORY02p2;
        console.log(managers.Game.currentScene);
      }
  
      // Public Methods
      // Initialize Game Variables and objects
      public Start(): void {

        // Sound
        this._beginningBGM = createjs.Sound.play("catastrophic");
        this._beginningBGM.loop = -1;
        this._beginningBGM.volume = 0.3;

        this._story = new objects.Story02Obj();
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
      }
    }
  }