module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables

    private _engineSound: createjs.AbstractSoundInstance;
    private _exitBtn: objects.Button;
    private _mapTutorial: objects.MapTutorial;
    private _testObject: objects.testObject;
    private _tank: objects.Tank;

    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;
    private _canShoot: boolean;

    // obstacles
    private _obstHouse1s: objects.ObstCity1[];
    private _obstHouse1Num: number;

    private _livesBoard: managers.LivesBoard;

    // The following arrays are used to place obstacles (houses)
    private _obstHouse1X: number[] = [160];
    private _obstHouse1Y: number[] = [430];
    private _obstHouse1Rotation: boolean[] = [true];

    // enemies
    private _enemyWolfs: objects.EnemyCity1[];
    private _obstWolfNum: number;

    private _enemyCorrupteds: objects.EnemyCity2[];
    private _obstCorruptedNum: number;

    // enemy array

    // Wolf: moving enemies, lots of property settings, invincible
    private _obstWolfX: number[] = [200];
    private _obstWolfY: number[] = [180];
    // S for speed
    private _obstWolfS: number[] = [2];
    // D for direction
    private _obstWolfD: boolean[] = [false]; 
    // N for distance
    // K, I know but we already have D for direction
    private _obstWolfN: number[] = [150];

    // Corrupted: static enemies, instant kill on collision, not invincible
    private _obstCorruptedX: number[] = [290];
    private _obstCorruptedY: number[] = [320];

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this._bulletFire = this._bulletFire.bind(this);

      this.Start();
    }

    // Private Methods
    private _backBtnClick(): void {
      // this._engineSound = createjs.Sound.play("engine");
      // this._engineSound.stop();
      createjs.Sound.stop();
      objects.Game.currentScene = config.Scene.STORY01;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {

      // sound
      this._engineSound = createjs.Sound.play("tutorial");
      this._engineSound.loop = -1; // play forever
      this._engineSound.volume = 0.3;

      this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);

      this._mapTutorial = new objects.MapTutorial(this.assetManager);

      this._testObject = new objects.testObject(this.assetManager);
      this._tank = new objects.Tank(this.assetManager);
      managers.Game.tank = this._tank;

      this._bulletNum = 50;
      this._bullets = new Array<objects.Bullet>();
      this._bulletCounter = 0;
      this._canShoot = true;

      // obstacle "House1" that block player's path
      this._obstHouse1s = new Array<objects.ObstCity1>();
      // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
      this._obstHouse1Num = this._obstHouse1X.length;
      for (let count = 0; count < this._obstHouse1Num; count++) {
        this._obstHouse1s[count] = new objects.ObstCity1(this.assetManager, this._obstHouse1X.shift(), this._obstHouse1Y.shift());
        if (this._obstHouse1Rotation[count])
          this._obstHouse1s[count].rotation = 90;
      }

      // enemies "Wolf" that hurt player, moving, and invincible
      this._enemyWolfs = new Array<objects.EnemyCity1>();
      this._obstWolfNum = this._obstWolfX.length;
      for (let count = 0; count < this._obstWolfNum; count++) {
        this._enemyWolfs[count] = new objects.EnemyCity1(this.assetManager, this._obstWolfX.shift(), this._obstWolfY.shift(), this._obstWolfS.shift(), this._obstWolfD.shift(), this._obstWolfN.shift());
      }

      // enemies "Corrupted" that insta-kill player on contact, vunerable
      this._enemyCorrupteds = new Array<objects.EnemyCity2>();
      this._obstCorruptedNum = this._obstCorruptedX.length;
      for (let count = 0; count < this._obstCorruptedNum; count++) {
        this._enemyCorrupteds[count] = new objects.EnemyCity2(this.assetManager, this._obstCorruptedX.shift(), this._obstCorruptedY.shift());
      }

      // liveboard UI for the scene
      this._livesBoard = new managers.LivesBoard();
      objects.Game.livesBoard = this._livesBoard;

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      this._testObject.Update();
      this._tank.Update();

      // bullets
      this._bulletFire();

      managers.Collision.Check(this._tank, this._testObject);

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

        this._bullets.forEach(bullet => {
          if (managers.Collision.Check(obstHouse1, bullet)) {
            bullet.alpha = 0;
          }
        })
      });
      // End of collision check for _obstHouse1

      // Enemy "Wolves" Check
      this._enemyWolfs.forEach(enemyWolf => {
        enemyWolf.Update();
        // check collision between tank and enemy wolf
        managers.Collision.Check(this._tank, enemyWolf);
      });
      // End of Enemy "Wolves" Check

      // Enemy "Corrupted" Check
      this._enemyCorrupteds.forEach(enemyCorrupted => {
        if (enemyCorrupted != null) {
          enemyCorrupted.Update();
        }
        this._bullets.forEach(bullet => {
          if (bullet.active && managers.Collision.Check(enemyCorrupted, bullet) && bullet.alpha != 0) {
            enemyCorrupted.alpha = 0;
          }
        });
        // check collision between corrupted and tank
        managers.Collision.Check(this._tank, enemyCorrupted);
      });
      // End of Enemy "Corrupted" Check


      // if (this._testObject != null) {
      //   this._testObject.Update();

      //   this._bullets.forEach(bullet => {
      //     if (bullet.active && managers.Collision.Check(bullet, this._testObject)) {
      //       this.removeChild(this._testObject);
      //       this._testObject = null;
      //     }
      //   });

      //   // check collision between test object and tank
      //   if (managers.Collision.Check(this._tank, this._testObject)) {
      //     objects.Game.currentScene = config.Scene.CITY;
      //   }
      // }
      // Game over check
      if (this._livesBoard.Lives <= 0) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.OVER;
      }

      // Plane that pick up player to next level
      if(this._testObject.isColliding == true){
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.STORY01;
      }

      this._bullets.forEach(bullet => {
        bullet.Update();
      });
    }

    private _bulletFire(): void {
      if (this._canShoot) {
        let shot = false;
        if (objects.Game.keyboardManager.shootLeft) {
          this._bullets[this._bulletCounter].shootLeft(this._tank.x, this._tank.y);
          shot = true;
        }
        else if (objects.Game.keyboardManager.shootRight) {
          this._bullets[this._bulletCounter].shootRight(this._tank.x, this._tank.y);
          shot = true;
        }
        else if (objects.Game.keyboardManager.shootForward) {
          this._bullets[this._bulletCounter].shootForward(this._tank.x, this._tank.y);
          shot = true;
        }
        else if (objects.Game.keyboardManager.shootBackward) {
          this._bullets[this._bulletCounter].shootBack(this._tank.x, this._tank.y);
          shot = true;
        }
        else if (objects.Game.keyboardManager.shoot) {
          this._bullets[this._bulletCounter].shoot(this._tank.x, this._tank.y, this._tank.rotation);
          shot = true;
        }

        if (shot) {
          this._canShoot = false;
          this._bulletCounter++;
          if (this._bulletCounter >= this._bulletNum - 1) {
            this._bulletCounter = 0;
          }
        }
      }
      else if (!(objects.Game.keyboardManager.shootBackward || objects.Game.keyboardManager.shootForward || objects.Game.keyboardManager.shootRight || objects.Game.keyboardManager.shootLeft || objects.Game.keyboardManager.shoot)) {
        this._canShoot = true;
      }
    }
    
    // This is where the fun happens
    public Main(): void {

      // add tutorial background to the scene
      this.addChild(this._mapTutorial);

      // add bullets to the scene
      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.Bullet(this.assetManager);
        this.addChild(this._bullets[count]);
      }

      // add the obstacles to the scene
      this._obstHouse1s.forEach(obstHouse1 => {
        this.addChild(obstHouse1);
      });

      // add enemy "Wolves" to the scene
      this._enemyWolfs.forEach(enemyWolf => {
        this.addChild(enemyWolf);
      });

      // add enemy "Corrupted" to the scene
      this._enemyCorrupteds.forEach(enemyCorrupted => {
        this.addChild(enemyCorrupted);
      });

      // add the testObject to the scene
      this.addChild(this._testObject);

      // add the tank to the scene
      this.addChild(this._tank);

      // add the tank flash effect
      this.addChild(this._tank.tankFlash);


      // add the backButton to the scene
      this.addChild(this._exitBtn);

      this.addChild(this._livesBoard.LivesLabel);

      this._exitBtn.on("click", this._backBtnClick)
    }
    
  }
}

