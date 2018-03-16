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
            this._exitBtn = new objects.Button(this.assetManager, "exitBtn", 60, 25, 0.3);
            this._testObject = new objects.testObject(this.assetManager);
            this._tank = new objects.Tank(this.assetManager);
            this._bulletNum = 50;
            this._bullets = new Array();
            this._bulletCounter = 0;
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this.assetManager);
                this.addChild(this._bullets[count]);
            }
            this.Main();
        };
        // triggered every frame
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._testObject.Update();
            this._tank.Update();
            this._bullets.forEach(function (bullet) {
                if (managers.Collision.Check(bullet, _this._testObject)) {
                    _this.removeChild(_this._testObject);
                }
                bullet.Update();
            });
            // check collision between test object and tank
            managers.Collision.Check(this._tank, this._testObject);
            if (this._testObject.isColliding == true) {
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            // add the testObject to the scene
            this.addChild(this._testObject);
            // add the tank to the scene
            this.addChild(this._tank);
            // add the backButton to the scene
            this.addChild(this._exitBtn);
            window.addEventListener("mousedown", this._bulletFire);
            this._exitBtn.on("click", this._backBtnClick);
        };
        PlayScene.prototype._bulletFire = function () {
            this._bullets[this._bulletCounter].x = this._tank.x;
            this._bullets[this._bulletCounter].y = this._tank.y;
            this._bulletCounter++;
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map