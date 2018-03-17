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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Public Properties
        // Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._startBtnClick = function () {
            objects.Game.currentScene = config.Scene.PLAY;
            //objects.Game.currentScene = config.Scene.CITY;
            //objects.Game.currentScene = config.Scene.DESERT;
            //objects.Game.currentScene = config.Scene.FROST;
            //objects.Game.currentScene = config.Scene.OVER;
            console.log(objects.Game.currentScene);
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._mapBackground = new objects.MapBackground(this.assetManager, "startGameBackground");
            this._gameLabel = new objects.Label("TankPunk", "45px", "jabjai", "#333333", 320, 120, true);
            this.startBtn = new objects.Button(this.assetManager, "startButton", 320, 370);
            this.Main();
        };
        StartScene.prototype.Update = function () {
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            this.addChild(this._mapBackground);
            // add the welcome label to the scene
            this.addChild(this._gameLabel);
            // add the startButton to the scene
            this.addChild(this.startBtn);
            this.startBtn.on("click", this._startBtnClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map