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
    var MapBackground = /** @class */ (function (_super) {
        __extends(MapBackground, _super);
        function MapBackground(assetManager, imageName) {
            return _super.call(this, assetManager.getResult(imageName)) || this;
        }
        return MapBackground;
    }(createjs.Bitmap));
    objects.MapBackground = MapBackground;
})(objects || (objects = {}));
//# sourceMappingURL=mapBackground.js.map