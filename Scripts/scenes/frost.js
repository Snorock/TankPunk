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
    var FrostScene = /** @class */ (function (_super) {
        __extends(FrostScene, _super);
        // Public Properties
        // Constructor
        function FrostScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        FrostScene.prototype._backBtnClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        // Public Methods
        // Initialize Game Variables and objects
        FrostScene.prototype.Start = function () {
            this._exitBtn = new objects.Button(this.assetManager, "exitBtn", 60, 25, 0.3);
            this._ocean = new objects.Ocean(this.assetManager);
            this._mapFrost = new objects.MapFrost(this.assetManager);
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
            this.Main();
        };
        // triggered every frame
        FrostScene.prototype.Update = function () {
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
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        FrostScene.prototype.Main = function () {
            // add the ocean to the scene
            // this.addChild(this._ocean);
            // add frost background to the scene
            this.addChild(this._mapFrost);
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
        return FrostScene;
    }(objects.Scene));
    scenes.FrostScene = FrostScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=frost.js.map