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
    var Story02p2Scene = /** @class */ (function (_super) {
        __extends(Story02p2Scene, _super);
        // Public Properties
        // Constructor
        function Story02p2Scene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Story02p2Scene.prototype._animationEnded = function () {
            objects.Game.currentScene = config.Scene.DESERT;
        };
        Story02p2Scene.prototype._backBtnClick = function () {
            objects.Game.currentScene = config.Scene.DESERT;
        };
        // Public Methods
        // Initialize Game Variables and objects
        Story02p2Scene.prototype.Start = function () {
            this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
            this._story = new objects.Story02Obj02();
            this._story.on("animationend", this._animationEnded.bind(this), false);
            this.Main();
        };
        Story02p2Scene.prototype.Update = function () {
            this._story.x = 320;
            this._story.y = 240;
            this._story.Update();
        };
        // This is where the fun happens
        Story02p2Scene.prototype.Main = function () {
            // add transition to the scene
            this.addChild(this._story);
            this.addChild(this._exitBtn);
            this._exitBtn.on("click", this._backBtnClick);
        };
        return Story02p2Scene;
    }(objects.Scene));
    scenes.Story02p2Scene = Story02p2Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=story02p2.js.map