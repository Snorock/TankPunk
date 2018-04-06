var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            // The following arrays are used to place obstacles (houses)
            _this._obstHouse1X = [160];
            _this._obstHouse1Y = [430];
            _this._obstHouse1Rotation = [true];
            // enemy array
            // Wolf: moving enemies, lots of property settings, invincible
            _this._obstWolfX = [200];
            _this._obstWolfY = [180];
            // S for speed
            _this._obstWolfS = [2];
            // D for direction
            _this._obstWolfD = [false];
            // N for distance
            // K, I know but we already have D for direction
            _this._obstWolfN = [150];
            // Corrupted: static enemies, instant kill on collision, not invincible
            _this._obstCorruptedX = [290];
            _this._obstCorruptedY = [320];
            _this._bulletFire = _this._bulletFire.bind(_this);
            _this.Start();
            return _this;
        }
        // Private Methods
        PlayScene.prototype._backBtnClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
            this._mapTutorial = new objects.MapTutorial(this.assetManager);
            this._testObject = new objects.testObject(this.assetManager);
            this._tank = new objects.Tank(this.assetManager);
            managers.Game.tank = this._tank;
            this._bulletNum = 50;
            this._bullets = new Array();
            this._bulletCounter = 0;
            this._canShoot = true;
            // obstacle "House1" that block player's path
            this._obstHouse1s = new Array();
            // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
            this._obstHouse1Num = this._obstHouse1X.length;
            for (var count = 0; count < this._obstHouse1Num; count++) {
                this._obstHouse1s[count] = new objects.ObstCity1(this.assetManager, this._obstHouse1X.shift(), this._obstHouse1Y.shift());
                if (this._obstHouse1Rotation[count])
                    this._obstHouse1s[count].rotation = 90;
            }
            // enemies "Wolf" that hurt player, moving, and invincible
            this._enemyWolfs = new Array();
            this._obstWolfNum = this._obstWolfX.length;
            for (var count = 0; count < this._obstWolfNum; count++) {
                this._enemyWolfs[count] = new objects.EnemyCity1(this.assetManager, this._obstWolfX.shift(), this._obstWolfY.shift(), this._obstWolfS.shift(), this._obstWolfD.shift(), this._obstWolfN.shift());
            }
            // enemies "Corrupted" that insta-kill player on contact, vunerable
            this._enemyCorrupteds = new Array();
            this._obstCorruptedNum = this._obstCorruptedX.length;
            for (var count = 0; count < this._obstCorruptedNum; count++) {
                this._enemyCorrupteds[count] = new objects.EnemyCity2(this.assetManager, this._obstCorruptedX.shift(), this._obstCorruptedY.shift());
            }
            // liveboard UI for the scene
            this._livesBoard = new managers.LivesBoard();
            objects.Game.livesBoard = this._livesBoard;
            this.Main();
        };
        // triggered every frame
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._testObject.Update();
            this._tank.Update();
            // bullets
            this._bulletFire();
            managers.Collision.Check(this._tank, this._testObject);
            // Collision detection for _obstHouse1
            this._obstHouse1s.forEach(function (obstHouse1) {
                managers.Collision.Check(_this._tank, obstHouse1);
                obstHouse1.Update();
                if (obstHouse1.isColliding == true && _this._tank.rotation == -90) {
                    objects.Game.keyboardManager.moveLeft = false;
                    config.Keys.A = null;
                    _this._tank.x = _this._tank.x + 2;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    _this._tank.x = _this._tank.x - 2;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    _this._tank.y = _this._tank.y + 2;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 180) {
                    objects.Game.keyboardManager.moveBackward = false;
                    config.Keys.S = null;
                    _this._tank.y = _this._tank.y - 2;
                    console.log("Can't move back" + _this._tank.rotation);
                }
                if (_this._tank.rotation != -90) {
                    config.Keys.A = 65;
                }
                if (_this._tank.rotation != 90) {
                    config.Keys.D = 68;
                }
                if (_this._tank.rotation != 0) {
                    config.Keys.W = 87;
                }
                if (_this._tank.rotation != 180) {
                    config.Keys.S = 83;
                }
                _this._bullets.forEach(function (bullet) {
                    if (managers.Collision.Check(obstHouse1, bullet)) {
                        bullet.alpha = 0;
                    }
                });
            });
            // End of collision check for _obstHouse1
            // Enemy "Wolves" Check
            this._enemyWolfs.forEach(function (enemyWolf) {
                enemyWolf.Update();
                // check collision between tank and enemy wolf
                managers.Collision.Check(_this._tank, enemyWolf);
            });
            // End of Enemy "Wolves" Check
            // Enemy "Corrupted" Check
            this._enemyCorrupteds.forEach(function (enemyCorrupted) {
                if (enemyCorrupted != null) {
                    enemyCorrupted.Update();
                }
                _this._bullets.forEach(function (bullet) {
                    if (bullet.active && managers.Collision.Check(enemyCorrupted, bullet) && bullet.alpha != 0) {
                        enemyCorrupted.alpha = 0;
                    }
                });
                // check collision between corrupted and tank
                managers.Collision.Check(_this._tank, enemyCorrupted);
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
                objects.Game.currentScene = config.Scene.OVER;
            }
            // Plane that pick up player to next level
            if (this._testObject.isColliding == true) {
                objects.Game.currentScene = config.Scene.CITY;
            }
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        PlayScene.prototype._bulletFire = function () {
            if (this._canShoot) {
                var shot = false;
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
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add tutorial background to the scene
            this.addChild(this._mapTutorial);
            // add bullets to the scene
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this.assetManager);
                this.addChild(this._bullets[count]);
            }
            // add the obstacles to the scene
            this._obstHouse1s.forEach(function (obstHouse1) {
                _this.addChild(obstHouse1);
            });
            // add enemy "Wolves" to the scene
            this._enemyWolfs.forEach(function (enemyWolf) {
                _this.addChild(enemyWolf);
            });
            // add enemy "Corrupted" to the scene
            this._enemyCorrupteds.forEach(function (enemyCorrupted) {
                _this.addChild(enemyCorrupted);
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
            this._exitBtn.on("click", this._backBtnClick);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map