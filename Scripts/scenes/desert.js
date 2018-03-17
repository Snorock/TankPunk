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
    var DesertScene = /** @class */ (function (_super) {
        __extends(DesertScene, _super);
        // Constructor
        function DesertScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            // The following arrays are used to place obstacles (trees)
            _this._obstX = [220, 400, 50, 290, 490, 200, 550];
            _this._obstY = [100, 140, 200, 280, 250, 400, 420];
            _this._obstResize = [false, true, true, true, true, false, false];
            _this.Start();
            return _this;
        }
        // Private Methods
        DesertScene.prototype._backBtnClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        // Public Methods
        // Initialize Game Variables and objects
        DesertScene.prototype.Start = function () {
            this._exitBtn = new objects.Button(this.assetManager, "exitBtn", 60, 25, 0.3);
            this._ocean = new objects.Ocean(this.assetManager);
            this._mapDesert = new objects.MapDesert(this.assetManager);
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
            // Trees
            this._obstTrees = new Array();
            // _obstNum should be the exact number of obstacle objects, excessive ones will be undefined
            this._obstNum = this._obstX.length;
            for (var count = 0; count < this._obstNum; count++) {
                this._obstTrees[count] = new objects.ObstDesert1(this.assetManager, this._obstX.shift(), this._obstY.shift());
                if (this._obstResize[count]) {
                    //this._obstTrees[count].rotation = 90;
                    this._obstTrees[count].scaleX = 0.5;
                    this._obstTrees[count].scaleY = 0.5;
                }
            }
            this.Main();
        };
        // triggered every frame
        DesertScene.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._testObject.Update();
            this._tank.Update();
            this._island.Update();
            // check collision between test object and tank
            managers.Collision.Check(this._tank, this._testObject);
            this._clouds.forEach(function (cloud) {
                cloud.Update();
            });
            // if the tank collides the testObject switch to over scene
            if (this._testObject.isColliding == true) {
                objects.Game.currentScene = config.Scene.FROST;
            }
            // Collision
            this._obstTrees.forEach(function (obstTree) {
                managers.Collision.Check(_this._tank, obstTree);
                obstTree.Update();
                if (obstTree.isColliding == true && _this._tank.rotation == -90) {
                    objects.Game.keyboardManager.moveLeft = false;
                    config.Keys.A = null;
                    // this._tank.x = obstTree.x + 35;
                    console.log("Can't move left" + _this._tank.rotation + _this.x);
                }
                if (obstTree.isColliding == true && _this._tank.rotation == 90) {
                    objects.Game.keyboardManager.moveRight = false;
                    config.Keys.D = null;
                    console.log("Can't move right" + _this._tank.rotation);
                }
                if (obstTree.isColliding == true && _this._tank.rotation == 0) {
                    objects.Game.keyboardManager.moveForward = false;
                    config.Keys.W = null;
                    console.log("Can't move forward" + _this._tank.rotation);
                }
                if (obstTree.isColliding == true && _this._tank.rotation == 180) {
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
        };
        // This is where the fun happens
        DesertScene.prototype.Main = function () {
            var _this = this;
            // add the ocean to the scene
            // this.addChild(this._ocean);
            // add desert background to the scene
            this.addChild(this._mapDesert);
            // add the obstacles to the scene
            this._obstTrees.forEach(function (obstTree) {
                _this.addChild(obstTree);
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
        };
        return DesertScene;
    }(objects.Scene));
    scenes.DesertScene = DesertScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=desert.js.map