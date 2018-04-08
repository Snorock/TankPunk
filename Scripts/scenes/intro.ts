module scenes {
    export class Story00Scene extends objects.Scene {
      
      private _story: objects.Story00Obj;
  
      // Public Properties
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager);
  
        this.Start();
      }
  
      // Private Mathods
  
      private _animationEnded(): void {
        objects.Game.currentScene = config.Scene.PLAY;
      }
  
      // Public Methods
      // Initialize Game Variables and objects
      public Start(): void {
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
        
      }
    }
  }