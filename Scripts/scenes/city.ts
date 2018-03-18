module scenes {
  export class CityScene extends objects.Scene {
    // Private Instance Variables
    private _exitBtn: objects.Button;
    // private _ocean: objects.Ocean;
    private _mapCity: objects.MapCity;
    private _testObject: objects.testObject;
    private _tank: objects.Tank;
    // private _island: objects.Island;
    // private _clouds: objects.Cloud[];
    // private _cloudNum: number;

    // obstacles
    private _obstHouse1s: objects.ObstCity1[];
    private _obstHouse1Num: number;

    private _obstHouse2s: objects.ObstCity2[];
    private _obstHouse2Num: number;

    private _obstCar1s: objects.ObstCity3[];
    private _obstCar1Num: number;

    // enemies
    private _enemyWolfs: objects.EnemyCity1[];
    private _obstWolfNum: number;

    // bullets
    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;
    private _canShoot: boolean;

    // lives
    private _livesBoard: managers.LivesBoard;

    // The following arrays are used to place obstacles (houses)
    private _obstHouse1X: number[] = [340, /*525,*/ 80, 300, 560, 167, 410, 560];
    private _obstHouse1Y: number[] = [73, /*46,*/ 178, 200, 185, 337, 390, 380];
    private _obstHouse1Rotation: boolean[] = [false, /*true,*/ false, true, false, true, true, true];

    private _obstHouse2X: number[] = [/*First Part is horizontal*/
                                        10,   46, 128, 168, 248, // First line, include top 
                                        140, 180, 430,// Second Line
                                        10,   50,  90, 130, 170, 210, 310, 350, 390, 430, 520, // Third Line
                                        80,// Fourth Line
                                        // Second part is vertical
                                        320, 320, 320, 320,// Vertical First Line
                                        520,// Vertical Second Line
                                      ];
    private _obstHouse2Y: number[] = [// First part is horizontal
                                        75,  75,  75,   75,  15, // First line, include top
                                        155, 155, 155,// Second Line
                                        280, 280, 280, 280, 280, 280, 265, 265, 265, 265, 265, // Thrid Line
                                        395, // Fourth Line
                                        // Second part is vertical
                                        345, 385, 425, 465,// Vertical First Line
                                        225,// Vertical Second Line
                                      ];

    private _obstCar1X: number[] = [/*First Part is horizontal*/
                                      200, 270, 340, 480, 610,// First Line
                                      310, 520,// Second Line
                                      100,// Third Line
                                    /*Second Part is vertical*/
                                      480, 480, 480, 480, 490, 
                                   ];
    private _obstCar1Y: number[] = [/*First Part is horizontal*/
                                      115, 135, 120, 115, 100,// First Line
                                      310, 310,// Second Line
                                      435,// Third Line
                                    /*Second Part is vertical*/
                                       20,  65, 160, 350, 400,
                                   ];

    // enemy array
    private _obstWolfX: number[] = [40, /*150, 260, 300, 340, 380, 450, 520, 600*/];
    private _obstWolfY: number[] = [150, /*200, 120, 100, 190, 400, 300, 110, 240*/];

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
      this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
      // this._ocean = new objects.Ocean(this.assetManager);
      this._mapCity = new objects.MapCity(this.assetManager);
      this._testObject = new objects.testObject(this.assetManager);
      this._tank = new objects.Tank(this.assetManager);
      // this._island = new objects.Island(this.assetManager);

      // instantiate the cloud array
      // this._clouds = new Array<objects.Cloud>();
      // this._cloudNum = 3;
      // // loop and add each cloud to the array
      // for (let count = 0; count < this._cloudNum; count++) {
      //   this._clouds[count] = new objects.Cloud(this.assetManager);
      // }

      // obstacle "House1" that block player's path
      this._obstHouse1s = new Array<objects.ObstCity1>();
      // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
      this._obstHouse1Num = this._obstHouse1X.length;
      for (let count = 0; count < this._obstHouse1Num; count++) {
        this._obstHouse1s[count] = new objects.ObstCity1(this.assetManager, this._obstHouse1X.shift(), this._obstHouse1Y.shift());
        if (this._obstHouse1Rotation[count])
          this._obstHouse1s[count].rotation = 90;
      }

      // obstacle "House2" that block player's path
      this._obstHouse2s = new Array<objects.ObstCity2>();
      this._obstHouse2Num = this._obstHouse2X.length;
      for (let count = 0; count < this._obstHouse2Num; count++) {
        this._obstHouse2s[count] = new objects.ObstCity2(this.assetManager, this._obstHouse2X.shift(), this._obstHouse2Y.shift());
      }

      // obstacle "Car1" that block player's path
      this._obstCar1s = new Array<objects.ObstCity3>();
      this._obstCar1Num = this._obstCar1X.length;
      for (let count = 0; count < this._obstCar1Num; count++) {
        this._obstCar1s[count] = new objects.ObstCity3(this.assetManager, this._obstCar1X.shift(), this._obstCar1Y.shift());
      }

      // enemies "Wolf" that hurt player, moving, and invincible
      this._enemyWolfs = new Array<objects.EnemyCity1>();
      this._obstWolfNum = this._obstWolfX.length;
      for (let count = 0; count < this._obstWolfNum; count++) {
        this._enemyWolfs[count] = new objects.EnemyCity1(this.assetManager, this._obstWolfX.shift(), this._obstWolfY.shift());
      }

      // liveboard UI for the scene
      this._livesBoard = new managers.LivesBoard();
      objects.Game.livesBoard = this._livesBoard;

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      // this._ocean.Update();
      this._testObject.Update();
      this._tank.Update();
      // this._island.Update();

      // check collision between test object and tank
      managers.Collision.Check(this._tank, this._testObject);

      // this._clouds.forEach(cloud => {
      //   cloud.Update();
      // });

      // Collision detection for _obstHouse1
      this._obstHouse1s.forEach(obstHouse1 => {
        managers.Collision.Check(this._tank, obstHouse1);
        obstHouse1.Update();

        if (obstHouse1.isColliding == true && this._tank.rotation == -90) {
          objects.Game.keyboardManager.moveLeft = false;
          config.Keys.A = null;
          this._tank.x = this._tank.x + 2;
          console.log("Can't move left" + this._tank.rotation + this.x);
        }

        if (obstHouse1.isColliding == true && this._tank.rotation == 90) {
          objects.Game.keyboardManager.moveRight = false;
          config.Keys.D = null;
          this._tank.x = this._tank.x - 2;
          console.log("Can't move right" + this._tank.rotation);
        }

        if (obstHouse1.isColliding == true && this._tank.rotation == 0) {
          objects.Game.keyboardManager.moveForward = false;
          config.Keys.W = null;
          this._tank.y = this._tank.y + 2;
          console.log("Can't move forward" + this._tank.rotation);
        }

        if (obstHouse1.isColliding == true && this._tank.rotation == 180) {
          objects.Game.keyboardManager.moveBackward = false;
          config.Keys.S = null;
          this._tank.y = this._tank.y - 2;
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
      // End of collision check for _obstHouse1

      // Collision detection for _obstHouse2
      this._obstHouse2s.forEach(obstHouse2 => {
        managers.Collision.Check(this._tank, obstHouse2);
        obstHouse2.Update();
        if (obstHouse2.isColliding == true && this._tank.rotation == -90) {
          objects.Game.keyboardManager.moveLeft = false;
          config.Keys.A = null;
          this._tank.x = this._tank.x + 2;
          console.log("Can't move left" + this._tank.rotation + this.x);
        }

        if (obstHouse2.isColliding == true && this._tank.rotation == 90) {
          objects.Game.keyboardManager.moveRight = false;
          config.Keys.D = null;
          this._tank.x = this._tank.x - 2;
          console.log("Can't move right" + this._tank.rotation);
        }

        if (obstHouse2.isColliding == true && this._tank.rotation == 0) {
          objects.Game.keyboardManager.moveForward = false;
          config.Keys.W = null;
          this._tank.y = this._tank.y + 2;
          console.log("Can't move forward" + this._tank.rotation);
        }

        if (obstHouse2.isColliding == true && this._tank.rotation == 180) {
          objects.Game.keyboardManager.moveBackward = false;
          config.Keys.S = null;
          this._tank.y = this._tank.y - 2;
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
      // End of collision check for _obstHouse2

      // Collision detection for _obstCar1
      this._obstCar1s.forEach(obstCar1 => {
        managers.Collision.Check(this._tank, obstCar1);
        obstCar1.Update();
        if (obstCar1.isColliding == true && this._tank.rotation == -90) {
          objects.Game.keyboardManager.moveLeft = false;
          config.Keys.A = null;
          this._tank.x = this._tank.x + 2;
          console.log("Can't move left" + this._tank.rotation + this.x);
        }

        if (obstCar1.isColliding == true && this._tank.rotation == 90) {
          objects.Game.keyboardManager.moveRight = false;
          config.Keys.D = null;
          this._tank.x = this._tank.x - 2;
          console.log("Can't move right" + this._tank.rotation);
        }

        if (obstCar1.isColliding == true && this._tank.rotation == 0) {
          objects.Game.keyboardManager.moveForward = false;
          config.Keys.W = null;
          this._tank.y = this._tank.y + 2;
          console.log("Can't move forward" + this._tank.rotation);
        }

        if (obstCar1.isColliding == true && this._tank.rotation == 180) {
          objects.Game.keyboardManager.moveBackward = false;
          config.Keys.S = null;
          this._tank.y = this._tank.y - 2;
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
      // End of collision check for _obstCar1

      this._enemyWolfs.forEach(enemyWolf => {
        enemyWolf.Update();
        // check collision between tank and enemy wolf
        managers.Collision.Check(this._tank, enemyWolf);
      })

      if (this._livesBoard.Lives <= 0) {
        objects.Game.currentScene = config.Scene.OVER;
      }

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
      this._obstHouse1s.forEach(obstHouse1 => {
        this.addChild(obstHouse1);
      });

      this._obstHouse2s.forEach(obstHouse2 => {
        this.addChild(obstHouse2);
      });

      this._obstCar1s.forEach(obstCar1 => {
        this.addChild(obstCar1);
      });

      // add enemies to the scene
      this._enemyWolfs.forEach(enemyWolf => {
        this.addChild(enemyWolf);
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

      this.addChild(this._livesBoard.LivesLabel);

      this._exitBtn.on("click", this._backBtnClick);
    }
  }
}
