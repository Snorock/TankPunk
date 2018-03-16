module scenes {
    export class DesertScene extends objects.Scene {
      // Private Instance Variables
      private _exitBtn: objects.Button;
      private _ocean: objects.Ocean;
      private _mapDesert: objects.MapDesert;
      private _testObject: objects.testObject;
      private _tank: objects.Tank;
      private _island: objects.Island;
      private _clouds: objects.Cloud[];
      private _cloudNum: number;
  
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
        this._ocean = new objects.Ocean(this.assetManager);
        this._mapDesert = new objects.MapDesert(this.assetManager);
        this._testObject = new objects.testObject(this.assetManager);
        this._tank = new objects.Tank(this.assetManager);
        this._island = new objects.Island(this.assetManager);
  
        // instantiate the cloud array
        this._clouds = new Array<objects.Cloud>();
        this._cloudNum = 3;
        // loop and add each cloud to the array
        for (let count = 0; count < this._cloudNum; count++) {
          this._clouds[count] = new objects.Cloud(this.assetManager);
        }
  
        this.Main();
      }
  
      // triggered every frame
      public Update(): void {
        this._ocean.Update();
        this._testObject.Update();
        this._tank.Update();
        this._island.Update();
  
        // check collision between test object and tank
        managers.Collision.Check(this._tank, this._testObject);
        
  
        this._clouds.forEach(cloud => {
          cloud.Update();
        });
  
        // if the tank collides the testObject switch to over scene
        if(this._testObject.isColliding == true){
          objects.Game.currentScene = config.Scene.FROST;
        }
  
      }
  
      // This is where the fun happens
      public Main(): void {
        // add the ocean to the scene
        // this.addChild(this._ocean);
        // add desert background to the scene
        this.addChild(this._mapDesert);
  
        // add the island to the scene
        // this.addChild(this._island);
  
        // add the testObject to the scene
        this.addChild(this._testObject);
  
        // add the tank to the scene
        this.addChild(this._tank);
  
        // add clouds to the scene
  
        /*
        this._clouds.forEach(cloud => {
          this.addChild(cloud);
        });
        */
  
        // add the backButton to the scene
        this.addChild(this._exitBtn);
  
        this._exitBtn.on("click", this._backBtnClick);
      }
    }
  }
  