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
    var Story01Obj = /** @class */ (function (_super) {
        __extends(Story01Obj, _super);
        // private instance variables
        // public properties
        // constructors
        function Story01Obj() {
            var _this = _super.call(this, "introstory") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Story01Obj.prototype.Start = function () {
        };
        Story01Obj.prototype.Update = function () {
        };
        return Story01Obj;
    }(objects.GameObject2));
    objects.Story01Obj = Story01Obj;
})(objects || (objects = {}));
//# sourceMappingURL=story01Obj.js.map