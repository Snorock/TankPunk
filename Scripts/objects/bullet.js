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
/// <reference path = "./gameobject.ts" />
var objects;
(function (objects) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // Constructor
        function Bullet(assetManager) {
            var _this = _super.call(this, assetManager, "bullet1") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._reset = function () {
            this.y = -1000;
            this.x = -1000;
        };
        Bullet.prototype._checkBounds = function () {
            if (this.x <= 0 || this.x >= 640 || this.y <= 0 || this.y >= 480 || this.isColliding) {
                this._reset();
            }
            else {
                this._updatePosition();
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this.speed = 10;
            this.shootRoom = 5; // must be a little more than half bullet+halftank
            this.rotation = 90;
            this._reset();
        };
        Bullet.prototype._updatePosition = function () {
            this.x -= this.speedX;
            this.y -= this.speedY;
        };
        Bullet.prototype.Update = function () {
            this._checkBounds();
        };
        Bullet.prototype.shootLeft = function (x, y) {
            this.rotation = -90;
            this.x = x - this.shootRoom;
            this.y = y;
            this.speedX = this.speed;
            this.speedY = 0;
            console.log(this.speedX);
        };
        Bullet.prototype.shootRight = function (x, y) {
            this.rotation = 90;
            this.x = x + this.shootRoom;
            this.y = y;
            this.speedX = -this.speed;
            this.speedY = 0;
        };
        Bullet.prototype.shootForward = function (x, y) {
            this.rotation = 0;
            this.x = x;
            this.y = y - this.shootRoom;
            this.speedX = 0;
            this.speedY = this.speed;
            console.log(this.speedY);
        };
        Bullet.prototype.shootBack = function (x, y) {
            this.rotation = 180;
            this.x = x;
            this.y = y + this.shootRoom;
            this.speedX = 0;
            this.speedY = -this.speed;
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map