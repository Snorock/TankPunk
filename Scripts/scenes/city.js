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
            _this._obstX = [308, 595, 80, 290, 560, 167, 370, 575];
            _this._obstY = [46, 46, 178, 200, 185, 337, 412, 402];
            _this._obstRotation = [false, true, false, true, false, true, false, true];
            // enemy array
            _this._obstPX = [40, 150, 260, 300, 340, 380, 450, 520, 600];
            _this._obstPY = [150, 200, 120, 100, 190, 400, 300, 110, 240];
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
            this._exitBtn = new objects.Button(this.assetManager, "exitBtn", 60, 25, 0.3);
            this._ocean = new objects.Ocean(this.assetManager);
            this._mapCity = new objects.MapCity(this.assetManager);
            this._testObject = new objects.testObject(this.assetManager);
            this._tank = new objects.Tank(this.assetManager);
            this._island = new objects.Island(this.assetManager);
            // instantiate the cloud array
            this._clouds = new Array();
            this._cloudNum = 3;
            // loop and add each cloud to the array
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud(this.assetManager);
            }
            this._obstPlanes = new Array();
            // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
            this._obstNum = this._obstX.length;
            for (var count = 0; count < this._obstNum; count++) {
                this._obstPlanes[count] = new objects.ObstCity1(this.assetManager, this._obstX.shift(), this._obstY.shift());
                if (this._obstRotation[count])
                    this._obstPlanes[count].rotation = 90;
            }
            this._enemyPlanes = new Array();
            this._obstPNum = this._obstPX.length;
            for (var count = 0; count < this._obstPNum; count++) {
                this._enemyPlanes[count] = new objects.EnemyCity1(this.assetManager, this._obstPX.shift(), this._obstPY.shift());
            }
            this.Main();
        };
        // triggered every frame
        CityScene.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._testObject.Update();
            this._tank.Update();
            this._island.Update();
            // check collision between test object and tank
            managers.Collision.Check(this._tank, this._testObject);
            // this._obstPlanes.forEach(obstPlane => {
            // });
            this._clouds.forEach(function (cloud) {
                cloud.Update();
            });
            this._obstPlanes.forEach(function (obstPlane) {
                managers.Collision.Check(_this._tank, obstPlane);
                obstPlane.Update();
                if (obstPlane.isColliding == true && _this._tank.rotation == -90) {
                    objects.Game.keyboardManager.moveLeft = false;
                    config.Keys.A = null;
                    // this._tank.x = obstPlane.x + 35;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstPlane.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstPlane.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstPlane.isColliding == true && _this._tank.rotation == 180) {
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
            this._enemyPlanes.forEach(function (enemyPlane) {
                enemyPlane.Update();
            });
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
            this._obstPlanes.forEach(function (obstPlane) {
                _this.addChild(obstPlane);
            });
            this._enemyPlanes.forEach(function (enemyPlane) {
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
            this._exitBtn.on("click", this._backBtnClick);
        };
        return CityScene;
    }(objects.Scene));
    scenes.CityScene = CityScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=city.js.map