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
    var GameObject6 = /** @class */ (function (_super) {
        __extends(GameObject6, _super);
        // public A: math.Vec2; //left apper corner
        // public B: math.Vec2; //right bottom corner
        // constructors
        function GameObject6(imageString) {
            var _this = _super.call(this, managers.Game.textureAtlasStory04, imageString) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // private methods
        GameObject6.prototype._initialize = function (t) {
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
        GameObject6.prototype.Start = function () {
        };
        GameObject6.prototype.Update = function () {
        };
        GameObject6.prototype.Reset = function () {
        };
        GameObject6.prototype.CheckBounds = function () {
        };
        GameObject6.prototype.Move = function () {
        };
        return GameObject6;
    }(createjs.Sprite));
    objects.GameObject6 = GameObject6;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject6.js.map