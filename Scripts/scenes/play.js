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
            this._canShoot = true;
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this.assetManager);
                this.addChild(this._bullets[count]);
            }
            this.Main();
        };
        // triggered every frame
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._tank.Update();
            this._bulletFire();
            if (this._testObject != null) {
                this._testObject.Update();
                this._bullets.forEach(function (bullet) {
                    if (bullet.active && managers.Collision.Check(bullet, _this._testObject)) {
                        _this.removeChild(_this._testObject);
                        _this._testObject = null;
                    }
                });
                // check collision between test object and tank
                if (managers.Collision.Check(this._tank, this._testObject)) {
                    objects.Game.currentScene = config.Scene.CITY;
                }
            }
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            // add the testObject to the scene
            this.addChild(this._testObject);
            // add the tank to the scene
            this.addChild(this._tank);
            // add the backButton to the scene
            this.addChild(this._exitBtn);
            this._exitBtn.on("click", this._backBtnClick);
        };
        PlayScene.prototype._bulletFire = function () {
            if (this._canShoot) {
                var shot = false;
                if (objects.Game.keyboardManager.shootLeft) {
                    this._bullets[this._bulletCounter].shootLeft(this._tank.x, this._tank.y);
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
                if (shot) {
                    this._canShoot = false;
                    this._bulletCounter++;
                    if (this._bulletCounter >= this._bulletNum - 1) {
                        this._bulletCounter = 0;
                    }
                }
            }
            else if (!(objects.Game.keyboardManager.shootBackward || objects.Game.keyboardManager.shootForward || objects.Game.keyboardManager.shootRight || objects.Game.keyboardManager.shootLeft)) {
                this._canShoot = true;
            }
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map