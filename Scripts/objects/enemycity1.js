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
    var EnemyCity1 = /** @class */ (function (_super) {
        __extends(EnemyCity1, _super);
        // public properties
        // Constructor
        function EnemyCity1(assetManager, coorX, coorY) {
            var _this = _super.call(this, assetManager, "cityEnemyWolf") || this;
            _this.coorX = coorX;
            _this.coorY = coorY;
            _this.x = coorX;
            _this.y = coorY;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        EnemyCity1.prototype.Start = function () {
            console.log("x " + this.x);
            console.log("y " + this.y);
            this.Reset();
        };
        // // updates the game object every frame
        EnemyCity1.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // // reset the objects location to some value
        EnemyCity1.prototype.Reset = function () {
            // this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = this.coorY;
            // this._dx = Math.floor((Math.random() * 4) - 2);
            this._dy = Math.floor((Math.random() * 1) + 1);
        };
        // // move the object to some new location
        EnemyCity1.prototype.Move = function () {
            this._dy = 1;
            // this.dir = true;
            if (this.y > this.coorY + 50) {
                this.dir = true;
                // console.log("Moving " + (this.y - this.coorY));
            }
            else if (this.y < this.coorY) {
                this.dir = false;
                // console.log("Stopped " + (this.y - this.coorY));
            }
            if (this.dir) {
                this.y -= this._dy;
            }
            else if (!this.dir) {
                this.y += this._dy;
            }
        };
        // check to see if some boundary has been passed
        EnemyCity1.prototype.CheckBounds = function () {
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
            else if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        return EnemyCity1;
    }(objects.GameObject));
    objects.EnemyCity1 = EnemyCity1;
})(objects || (objects = {}));
//# sourceMappingURL=enemycity1.js.map