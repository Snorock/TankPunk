module scenes {
  export class CityScene extends objects.Scene {
    // Private Instance Variables
    private _exitBtn: objects.Button;
    private _ocean: objects.Ocean;
    private _mapCity: objects.MapCity;
    private _testObject: objects.testObject;
    private _tank: objects.Tank;
    private _island: objects.Island;
    private _clouds: objects.Cloud[];
    private _cloudNum: number;

    // obstacles
    private _obstPlanes: objects.ObstCity1[];
    private _obstNum: number;

    // enemies
    private _enemyPlanes: objects.EnemyCity1[];
    private _obstPNum: number;

    // The following arrays are used to place obstacles
    private _obstX: number[] = [/*First Part is horizontal*/
                                0, 40, 80, 120, 160, 200, 240, 
                                120, 160, 200, 240, 280, 320, 360,
                                200, 240, 320, 400, 440, 480, 600, 640,
                                0, 40, 80, 120, 300, 340, 380, 500, 540, 580, 620,
                                // Second part is horizontal
                                520, 520, 520,
                                340, 340, 340,];
    private _obstY: number[] = [// First part is horizontal
                                0, 0,  0,  0,   0,   0,   0  ,  
                                100, 100, 100, 100, 100, 100, 100,
                                180, 180, 180, 180, 180, 180, 180, 180,
                                300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
                                // Second part is horizontal
                                0, 60, 100,
                                340, 380, 420,];

    // enemy array
    private _obstPX: number[] = [40, 150, 260,  300, 340, 380, 450, 520, 600];
    private _obstPY: number[] = [150, 200, 120, 100, 190, 400, 300, 110, 240];

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
      this._mapCity = new objects.MapCity(this.assetManager);
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

      this._obstPlanes = new Array<objects.ObstCity1>();
      // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
      this._obstNum = 200;
      for (let count = 0; count < this._obstNum; count++) {
        this._obstPlanes[count] = new objects.ObstCity1(this.assetManager, this._obstX.shift(), this._obstY.shift());
      }

      this._enemyPlanes = new Array<objects.EnemyCity1>();
      this._obstPNum = 20;
      for (let count = 0; count < this._obstPNum; count++) {
        this._enemyPlanes[count] = new objects.EnemyCity1(this.assetManager, this._obstPX.shift(), this._obstPY.shift());
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

      // this._obstPlanes.forEach(obstPlane => {

      // });

      this._clouds.forEach(cloud => {
        cloud.Update();
      });

      this._obstPlanes.forEach(obstPlane => {
        managers.Collision.Check(this._tank, obstPlane);
        obstPlane.Update();
        
        if (obstPlane.isColliding == true && this._tank.rotation == -90) {
            objects.Game.keyboardManager.moveLeft = false;
            config.Keys.A = null;
            // this._tank.x = obstPlane.x + 35;
            console.log("Can't move left" + this._tank.rotation + this.x);
        }

        if (obstPlane.isColliding == true && this._tank.rotation == 90) {
            objects.Game.keyboardManager.moveRight = false;
            config.Keys.D = null;
            console.log("Can't move right" + this._tank.rotation);
        }

        if (obstPlane.isColliding == true && this._tank.rotation == 0) {
            objects.Game.keyboardManager.moveForward = false;
            config.Keys.W = null;
            console.log("Can't move forward" + this._tank.rotation);
        }

        if (obstPlane.isColliding == true && this._tank.rotation == 180) {
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

      this._enemyPlanes.forEach(enemyPlane => {
        enemyPlane.Update();
      })

      

      // if the tank collides the testObject switch to over scene
      if (this._testObject.isColliding == true) {
        objects.Game.currentScene = config.Scene.DESERT;
      }

    }

    // This is where the fun happens
    public Main(): void {
      // add the ocean to the scene
      // this.addChild(this._ocean);

      // add city background to the scene
      this.addChild(this._mapCity);

      // add the island to the scene
      // this.addChild(this._island);

      // add the obstacles to the scene
      this._obstPlanes.forEach(obstPlane => {
        this.addChild(obstPlane);
      });

      this._enemyPlanes.forEach(enemyPlane => {
        this.addChild(enemyPlane);
      });
      // this.addChild(this._noarray);

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
