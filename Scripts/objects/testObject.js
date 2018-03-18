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
    var testObject = /** @class */ (function (_super) {
        __extends(testObject, _super);
        // private instance variables
        // public properties
        // Constructor
        function testObject(assetManager) {
            var _this = _super.call(this, assetManager, "test") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        testObject.prototype.Start = function () {
            this.x = 580; //this.x = 30;
            this.y = 45; //this.y = 380;
        };
        // updates the game object every frame
        testObject.prototype.Update = function () {
        };
        // reset the objects location to some value
        testObject.prototype.Reset = function () {
        };
        return testObject;
    }(objects.GameObject));
    objects.testObject = testObject;
})(objects || (objects = {}));
//# sourceMappingURL=testObject.js.map