module objects {
    export class testObject extends objects.GameObject {
      // private instance variables
  
      // public properties
  
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager, "test");
        this.Start();
      }
  
      // private methods
  
      // public methods
  
      // Initializes variables and creates new objects
      public Start():void {
        this.x = 600; //this.x = 30;
        this.y = 25; //this.y = 380;
      }
  
      // updates the game object every frame
      public Update():void {
        
      }
  
      // reset the objects location to some value
      public Reset():void {
  
      }
    }
  }
  