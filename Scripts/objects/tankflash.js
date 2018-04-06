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
    var TankFlash = /** @class */ (function (_super) {
        __extends(TankFlash, _super);
        // private instance variables
        // public properties
        // constructors
        function TankFlash() {
            return _super.call(this, "tankflash") || this;
        }
        // private methods
        // public methods
        TankFlash.prototype.Start = function () {
        };
        TankFlash.prototype.Update = function () {
        };
        return TankFlash;
    }(objects.GameObject2));
    objects.TankFlash = TankFlash;
})(objects || (objects = {}));
//# sourceMappingURL=tankflash.js.map