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
            _this._obstHouse1X = [308, 595, 80, 290, 560, 167, 370, 575];
            _this._obstHouse1Y = [46, 46, 178, 200, 185, 337, 412, 402];
            _this._obstRotation = [false, true, false, true, false, true, false, true];
            // enemy array
            _this._obstWolfX = [40, 150, 260, 300, 340, 380, 450, 520, 600];
            _this._obstWolfY = [150, 200, 120, 100, 190, 400, 300, 110, 240];
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
                if (this._obstRotation[count])
                    this._obstHouse1s[count].rotation = 90;
            }
            // enemies that hurt player
            this._enemyWolfs = new Array();
            this._obstWolfNum = this._obstWolfX.length;
            for (var count = 0; count < this._obstWolfNum; count++) {
                this._enemyWolfs[count] = new objects.EnemyCity1(this.assetManager, this._obstWolfX.shift(), this._obstWolfY.shift());
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
                    // this._tank.x = obstPlane.x + 35;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstHouse1.isColliding == true && _this._tank.rotation == 180) {
                    objects.Game.keyboardManager.moveBackward = false;
                    config.Keys.S = null;
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
            });
            // end of collision check for _obstHouse1
            // Collision detection for _obstHouse2
            // End of collision check for _obstHouse2
            this._enemyWolfs.forEach(function (enemyWolf) {
                enemyWolf.Update();
                // check collision between tank and enemy wolf
                managers.Collision.Check(_this._tank, enemyWolf);
            });
            if (this._livesBoard.Lives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
            }
            // if the tank collides the testObject switch to over scene
            if (this._testObject.isColliding == true) {
                objects.Game.currentScene = config.Scene.DESERT;
            }
        };
        // This is where the fun happens
        CityScene.prototype.Main = function () {
            // add the ocean to the scene
            // this.addChild(this._ocean);
            var _this = this;
            // add city background to the scene
            this.addChild(this._mapCity);
            // add the island to the scene
            // this.addChild(this._island);
            // add the obstacles to the scene
            this._obstHouse1s.forEach(function (obstPlane) {
                _this.addChild(obstPlane);
            });
            this._enemyWolfs.forEach(function (enemyPlane) {
                _this.addChild(enemyPlane);
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
        };
        return CityScene;
    }(objects.Scene));
    scenes.CityScene = CityScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=city.js.map