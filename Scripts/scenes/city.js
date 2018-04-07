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
    var CityScene = /** @class */ (function (_super) {
        __extends(CityScene, _super);
        // Public Properties
        // Constructor
        function CityScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            // The following arrays are used to place obstacles (houses)
            _this._obstHouse1X = [340, /*525,*/ 80, 300, 560, 167, 410, 560];
            _this._obstHouse1Y = [73, /*46,*/ 178, 200, 185, 337, 390, 380];
            _this._obstHouse1Rotation = [false, /*true,*/ false, true, false, true, true, true];
            _this._obstHouse2X = [
                10, 46, 128, 168, 248,
                140, 180, 430,
                10, 50, 90, 130, 170, 210, 310, 350, 390, 430, 520,
                80,
                // Second part is vertical
                320, 320, 320, 320,
                520,
            ];
            _this._obstHouse2Y = [
                75, 75, 75, 75, 15,
                155, 155, 155,
                280, 280, 280, 280, 280, 280, 265, 265, 265, 265, 265,
                395,
                // Second part is vertical
                345, 385, 425, 465,
                225,
            ];
            _this._obstCar1X = [
                200, 270, 340, 480, 610,
                310, 520,
                100,
                /*Second Part is vertical*/
                480, 480, 480, 480, 490,
            ];
            _this._obstCar1Y = [
                115, 135, 120, 115, 100,
                310, 310,
                435,
                /*Second Part is vertical*/
                20, 65, 160, 350, 400,
            ];
            // enemy array
            // Wolf: moving enemies, lots of property settings, invincible
            _this._obstWolfX = [80, 220, 320, 320, 140, 400, 620, 480 /*150, 260, 300, 340, 380, 450, 520, 600*/];
            _this._obstWolfY = [100, 80, 180, 220, 400, 40, 140, 310 /*200, 120, 100, 190, 400, 300, 110, 240*/];
            // S for speed
            _this._obstWolfS = [2, 3, 4, 1.5, 5, 1, 1.5, 0.5];
            // D for direction
            _this._obstWolfD = [true, true, false, false, false, true, true, false];
            // N for distance
            // K, I know but we already have D for direction
            _this._obstWolfN = [150, 150, 280, 280, 440, 410, 320, 130];
            // Corrupted: static enemies, instant kill on collision, not invincible
            _this._obstCorruptedX = [100, 90, 280, 400, 475, 160, 220, 560];
            _this._obstCorruptedY = [330, 65, 70, 180, 235, 460, 460, 235];
            _this._bulletFire = _this._bulletFire.bind(_this);
            _this.Start();
            return _this;
        }
        // Private Methods
        CityScene.prototype._backBtnClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        // Public Methods
        // Initialize Game Variables and objects
        CityScene.prototype.Start = function () {
            this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
            // this._ocean = new objects.Ocean(this.assetManager);
            this._mapCity = new objects.MapCity(this.assetManager);
            this._testObject = new objects.testObject(this.assetManager);
            this._tank = new objects.Tank(this.assetManager);
            managers.Game.tank = this._tank;
            // bullets
            this._bulletNum = 50;
            this._bullets = new Array();
            this._bulletCounter = 0;
            this._canShoot = true;
            // this._island = new objects.Island(this.assetManager);
            // instantiate the cloud array
            // this._clouds = new Array<objects.Cloud>();
            // this._cloudNum = 3;
            // // loop and add each cloud to the array
            // for (let count = 0; count < this._cloudNum; count++) {
            //   this._clouds[count] = new objects.Cloud(this.assetManager);
            // }
            // obstacle "House1" that block player's path
            this._obstHouse1s = new Array();
            // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
            this._obstHouse1Num = this._obstHouse1X.length;
            for (var count = 0; count < this._obstHouse1Num; count++) {
                this._obstHouse1s[count] = new objects.ObstCity1(this.assetManager, this._obstHouse1X.shift(), this._obstHouse1Y.shift());
                if (this._obstHouse1Rotation[count])
                    this._obstHouse1s[count].rotation = 90;
            }
            // obstacle "House2" that block player's path
            this._obstHouse2s = new Array();
            this._obstHouse2Num = this._obstHouse2X.length;
            for (var count = 0; count < this._obstHouse2Num; count++) {
                this._obstHouse2s[count] = new objects.ObstCity2(this.assetManager, this._obstHouse2X.shift(), this._obstHouse2Y.shift());
            }
            // obstacle "Car1" that block player's path
            this._obstCar1s = new Array();
            this._obstCar1Num = this._obstCar1X.length;
            for (var count = 0; count < this._obstCar1Num; count++) {
                this._obstCar1s[count] = new objects.ObstCity3(this.assetManager, this._obstCar1X.shift(), this._obstCar1Y.shift());
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
        CityScene.prototype.Update = function () {
            var _this = this;
            // this._ocean.Update();
            this._testObject.Update();
            this._tank.Update();
            // bullets
            this._bulletFire();
            // this._island.Update();
            // check collision between test object and tank
            managers.Collision.Check(this._tank, this._testObject);
            // this._clouds.forEach(cloud => {
            //   cloud.Update();
            // });
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
            // Collision detection for _obstHouse2
            this._obstHouse2s.forEach(function (obstHouse2) {
                managers.Collision.Check(_this._tank, obstHouse2);
                obstHouse2.Update();
                if (obstHouse2.isColliding == true && _this._tank.rotation == -90) {
                    objects.Game.keyboardManager.moveLeft = false;
                    config.Keys.A = null;
                    _this._tank.x = _this._tank.x + 2;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstHouse2.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    _this._tank.x = _this._tank.x - 2;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstHouse2.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    _this._tank.y = _this._tank.y + 2;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstHouse2.isColliding == true && _this._tank.rotation == 180) {
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
                    if (managers.Collision.Check(obstHouse2, bullet)) {
                        bullet.alpha = 0;
                    }
                });
            });
            // End of collision check for _obstHouse2
            // Collision detection for _obstCar1
            this._obstCar1s.forEach(function (obstCar1) {
                managers.Collision.Check(_this._tank, obstCar1);
                obstCar1.Update();
                if (obstCar1.isColliding == true && _this._tank.rotation == -90) {
                    objects.Game.keyboardManager.moveLeft = false;
                    config.Keys.A = null;
                    _this._tank.x = _this._tank.x + 2;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstCar1.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    _this._tank.x = _this._tank.x - 2;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstCar1.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    _this._tank.y = _this._tank.y + 2;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstCar1.isColliding == true && _this._tank.rotation == 180) {
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
                    if (managers.Collision.Check(obstCar1, bullet)) {
                        bullet.alpha = 0;
                    }
                });
            });
            // End of collision check for _obstCar1
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
            // Game over check
            if (this._livesBoard.Lives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
            }
            // Plane that pick up player to next level
            if (this._testObject.isColliding == true) {
                objects.Game.currentScene = config.Scene.DESERT;
            }
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        // Bullet fire mechanic
        CityScene.prototype._bulletFire = function () {
            if (this._canShoot) {
                var shot = false;
                if (objects.Game.keyboardManager.shootLeft) {
                    this._bullets[this._bulletCounter].shootLeft(this._tank.x, this._tank.y);
                    console.log("Fired");
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
        CityScene.prototype.Main = function () {
            // add the ocean to the scene
            // this.addChild(this._ocean);
            var _this = this;
            // add city background to the scene
            this.addChild(this._mapCity);
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this.assetManager);
                this.addChild(this._bullets[count]);
            }
            // add the island to the scene
            // this.addChild(this._island);
            // add the obstacles to the scene
            this._obstHouse1s.forEach(function (obstHouse1) {
                _this.addChild(obstHouse1);
            });
            this._obstHouse2s.forEach(function (obstHouse2) {
                _this.addChild(obstHouse2);
            });
            this._obstCar1s.forEach(function (obstCar1) {
                _this.addChild(obstCar1);
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
            // add the tank to the scene
            this.addChild(this._tank.tankFlash);
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
        };
        return CityScene;
    }(objects.Scene));
    scenes.CityScene = CityScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=city.js.map