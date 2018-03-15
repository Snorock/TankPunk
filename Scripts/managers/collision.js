var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // DISTANCE method
            //let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            //let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
            //if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
            var A1 = new math.Vec2(object1.x - object1.halfWidth, object1.y - object1.halfHeight);
            var B1 = new math.Vec2(object1.x + object1.halfWidth, object1.y + object1.halfHeight);
            var A2 = new math.Vec2(object2.x - object2.halfWidth, object2.y - object2.halfHeight);
            var B2 = new math.Vec2(object2.x + object2.halfWidth, object2.y + object2.halfHeight);
            console.log(A1.x + " < " + A2.x + " < " + B1.x + " and " + A1.y + " < " + A2.y + " < " + B1.y);
            //AABB Method
            if ((A1.x <= A2.x) && (A2.x <= B1.x) && (A1.y <= A2.y) && (A2.y <= B1.y)) {
                if (!object2.isColliding) {
                    console.log("Collision!!!");
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map