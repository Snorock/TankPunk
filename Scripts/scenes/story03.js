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
    var Story03Scene = /** @class */ (function (_super) {
        __extends(Story03Scene, _super);
        // Public Properties
        // Constructor
        function Story03Scene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Story03Scene.prototype._animationEnded = function () {
            this._beginningBGM.stop();
            objects.Game.currentScene = config.Scene.FROST;
        };
        Story03Scene.prototype._backBtnClick = function () {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.FROST;
        };
        // Public Methods
        // Initialize Game Variables and objects
        Story03Scene.prototype.Start = function () {
            // Sound
            this._beginningBGM = createjs.Sound.play("frostSound");
            this._beginningBGM.loop = -1;
            this._beginningBGM.volume = 0.3;
            this._exitBtn = new objects.Button(this.assetManager, "exitButton", 60, 30, 0.7);
            this._story = new objects.Story03();
            this._story.on("animationend", this._animationEnded.bind(this), false);
            this.Main();
        };
        Story03Scene.prototype.Update = function () {
            this._story.x = 320;
            this._story.y = 240;
            this._story.Update();
        };
        // This is where the fun happens
        Story03Scene.prototype.Main = function () {
            // add transition to the scene
            this.addChild(this._story);
            this.addChild(this._exitBtn);
            this._exitBtn.on("click", this._backBtnClick);
        };
        return Story03Scene;
    }(objects.Scene));
    scenes.Story03Scene = Story03Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=story03.js.map