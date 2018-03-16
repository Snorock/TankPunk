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
            var _this = _super.call(this, assetManager, "island") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._reset = function () {
            this.y = -1000;
            this.x = -1000;
        };
        Bullet.prototype._checkBounds = function () {
            if (this.y <= 0 + this.height || this.isColliding) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this.speed = -10;
            this._reset();
        };
        Bullet.prototype._updatePosition = function () {
            this.y += this.speed;
        };
        Bullet.prototype.Update = function () {
            if (this.y > 0) {
                this._updatePosition();
                this._checkBounds();
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map