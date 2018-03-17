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
  
      // obstacles
      private _obstTrees: objects.ObstDesert1[];
      private _obstNum: number;
      
      // The following arrays are used to place obstacles (trees)
      private _obstX: number[] = [220, 400, 50, 290, 490, 200, 550];
      private _obstY: number[] = [100, 140, 200, 280, 250, 400, 420];
      private _obstResize: boolean[] = [false, true, true, true, true, false, false];
  
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

        // Trees
        this._obstTrees = new Array<objects.ObstDesert1>();
        // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
        this._obstNum = this._obstX.length;
        for (let count = 0; count < this._obstNum; count++) {
          this._obstTrees[count] = new objects.ObstDesert1(this.assetManager, this._obstX.shift(), this._obstY.shift());
          
          if (this._obstResize[count]) {
            //this._obstTrees[count].rotation = 90;
            this._obstTrees[count].scaleX = 0.5;
            this._obstTrees[count].scaleY = 0.5;
          }
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

        // Collision
        this._obstTrees.forEach(obstTree => {
          managers.Collision.Check(this._tank, obstTree);
          obstTree.Update();
          
          if (obstTree.isColliding == true && this._tank.rotation == -90) {
              objects.Game.keyboardManager.moveLeft = false;
              config.Keys.A = null;
              // this._tank.x = obstTree.x + 35;
              console.log("Can't move left" + this._tank.rotation + this.x);
          }
  
          if (obstTree.isColliding == true && this._tank.rotation == 90) {
              objects.Game.keyboardManager.moveRight = false;
              config.Keys.D = null;
              console.log("Can't move right" + this._tank.rotation);
          }
  
          if (obstTree.isColliding == true && this._tank.rotation == 0) {
              objects.Game.keyboardManager.moveForward = false;
              config.Keys.W = null;
              console.log("Can't move forward" + this._tank.rotation);
          }
  
          if (obstTree.isColliding == true && this._tank.rotation == 180) {
              objects.Game.keyboardManager.moveBackward = false;
              config.Keys.S = null;
              console.log("Can't move back" + this._tank.rotation);
          }
  
          if (this._tank.rotation != -90) {
            config.Keys.A = 65;
          }
          if (this._tank.rotation != 90) {
            config.Keys.D = 68;
          }
          if (this._tank.rotation != 0) {
            config.Keys.W = 87;
          }
          if (this._tank.rotation != 180) {
            config.Keys.S = 83;
          }
        });
  
      }
  
      // This is where the fun happens
      public Main(): void {
        // add the ocean to the scene
        // this.addChild(this._ocean);
        // add desert background to the scene
        this.addChild(this._mapDesert);
  
        // add the obstacles to the scene
        this._obstTrees.forEach(obstTree => {
          this.addChild(obstTree);
        });

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
  