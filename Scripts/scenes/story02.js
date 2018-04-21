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
    var Story02Scene = /** @class */ (function (_super) {
        __extends(Story02Scene, _super);
        // Public Properties
        // Constructor
        function Story02Scene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Story02Scene.prototype._animationEnded = function () {
            objects.Game.currentScene = config.Scene.STORY02p2;
            console.log(managers.Game.currentScene);
        };
        // Public Methods
        // Initialize Game Variables and objects
        Story02Scene.prototype.Start = function () {
            // Sound
            this._beginningBGM = createjs.Sound.play("catastrophic");
            this._beginningBGM.loop = -1;
            this._beginningBGM.volume = 0.3;
            this._story = new objects.Story02Obj();
            this._story.on("animationend", this._animationEnded.bind(this), false);
            this.Main();
        };
        Story02Scene.prototype.Update = function () {
            this._story.x = 320;
            this._story.y = 240;
            this._story.Update();
        };
        // This is where the fun happens
        Story02Scene.prototype.Main = function () {
            // add transition to the scene
            this.addChild(this._story);
        };
        return Story02Scene;
    }(objects.Scene));
    scenes.Story02Scene = Story02Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=story02.js.map