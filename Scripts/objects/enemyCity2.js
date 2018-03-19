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
    var EnemyCity2 = /** @class */ (function (_super) {
        __extends(EnemyCity2, _super);
        // public properties
        // Constructor
        function EnemyCity2(assetManager, coorX, coorY) {
            var _this = _super.call(this, assetManager, "cityEnemyCorrupted") || this;
            _this.coorX = coorX;
            _this.coorY = coorY;
            _this.x = coorX;
            _this.y = coorY;
            // this._dx = sDy;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        EnemyCity2.prototype.Start = function () {
            // console.log("x " + this.x);
            // console.log("y " + this.y);
            this.Reset();
        };
        // // updates the game object every frame
        EnemyCity2.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // // reset the objects location to some value
        EnemyCity2.prototype.Reset = function () {
            // this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = this.coorY;
            // this._dx = Math.floor((Math.random() * 4) - 2);
            // this._dy = Math.floor((Math.random() * 1) - 0.5);
        };
        // // move the object to some new location
        EnemyCity2.prototype.Move = function () {
            // this._dy = 0.3;
            // this._dy = this.speedDy;
            // if (this.direction == true) {
            //     if (this.y > this.coorY + this.distance) {
            //         this.dir = true;
            //         // console.log("Moving " + (this.y - this.coorY));
            //     }
            //     else if (this.y < this.coorY) {
            //         this.dir = false;
            //         // console.log("Stopped " + (this.y - this.coorY));
            //     }
            //     if (this.dir) {
            //         this.y -= this._dy;
            //     }
            //     else if (!this.dir) {
            //         this.y += this._dy;
            //     } 
            // }
            // else if (this.direction == false) {
            //     if (this.x > this.coorX + this.distance) {
            //         this.dir = true;
            //         // console.log("Moving " + (this.y - this.coorY));
            //     }
            //     else if (this.x < this.coorX) {
            //         this.dir = false;
            //         // console.log("Stopped " + (this.y - this.coorY));
            //     }
            //     /* _dy is used here because _dy & _dx both are speed
            //      the direction is predined, 
            //      and the enemy object doesn't need to move in a slope*/
            //     if (this.dir) {
            //         this.x -= this._dy;
            //     }
            //     else if (!this.dir) {
            //         this.x += this._dy;
            //     } 
            // }
        };
        // check to see if some boundary has been passed
        EnemyCity2.prototype.CheckBounds = function () {
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
            else if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        return EnemyCity2;
    }(objects.GameObject));
    objects.EnemyCity2 = EnemyCity2;
})(objects || (objects = {}));
//# sourceMappingURL=enemycity2.js.map