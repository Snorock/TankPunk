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
    var ObstDesert1 = /** @class */ (function (_super) {
        __extends(ObstDesert1, _super);
        //   private instance variables
        // public properties
        // Constructor
        function ObstDesert1(assetManager, /*obst1: objects.GameObject*/ coorX, coorY) {
            var _this = _super.call(this, assetManager, "desertTree") || this;
            _this.coorX = coorX;
            _this.coorY = coorY;
            // let obstBuilding = new math.Vec2(obst1.x, obst1.y);
            _this.x = coorX;
            _this.y = coorY;
            return _this;
            // this.Start();
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        // public Start(): void {
        //     console.log("x " + this.x);
        //     console.log("y " + this.y);
        //     // this.Reset();
        // }
        // // updates the game object every frame
        ObstDesert1.prototype.Update = function () {
            // this.Move();
            this.CheckBounds();
        };
        // // reset the objects location to some value
        // public Reset(): void {
        //     // this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
        //     // this.y = -this.height;
        //     // this._dx = Math.floor((Math.random() * 4) - 2);
        //     // this._dy = Math.floor((Math.random() * 5) + 5);
        // }
        // // move the object to some new location
        // public Move(): void {
        //     // this.y += this._dy;
        //     // this.x += this._dx;
        // }
        // // check to see if some boundary has been passed
        ObstDesert1.prototype.CheckBounds = function () {
            // // right boundary
            // if(this.x >= 640 - this.halfWidth) {
            //     this.x = 640 - this.halfWidth;
            // }
            // // left boundary
            // else if(this.x <= this.halfWidth) {
            //     this.x = this.halfWidth;
            // }
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
            else if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        return ObstDesert1;
    }(objects.GameObject));
    objects.ObstDesert1 = ObstDesert1;
})(objects || (objects = {}));
//# sourceMappingURL=obstDesert1.js.map