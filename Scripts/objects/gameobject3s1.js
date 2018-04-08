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
var objects;
(function (objects) {
    var GameObject3s1 = /** @class */ (function (_super) {
        __extends(GameObject3s1, _super);
        // public A: math.Vec2; //left apper corner
        // public B: math.Vec2; //right bottom corner
        // constructors
        function GameObject3s1(imageString) {
            var _this = _super.call(this, managers.Game.textureAtlasStory01, imageString) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // private methods
        GameObject3s1.prototype._initialize = function (t) {
            if (t) {
                this.tag = t;
            }
            else {
                this.tag = "";
            }
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            // this.A = new math.Vec2(this.x-this.halfWidth, this.y-this.halfHeight); 
            // this.B = new math.Vec2(this.x+this.halfWidth, this.y+this.halfHeight);
            this.isColliding = false;
        };
        // public methods
        GameObject3s1.prototype.Start = function () {
        };
        GameObject3s1.prototype.Update = function () {
        };
        GameObject3s1.prototype.Reset = function () {
        };
        GameObject3s1.prototype.CheckBounds = function () {
        };
        GameObject3s1.prototype.Move = function () {
        };
        return GameObject3s1;
    }(createjs.Sprite));
    objects.GameObject3s1 = GameObject3s1;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject3s1.js.map