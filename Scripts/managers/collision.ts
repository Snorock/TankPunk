module managers {
    export class Collision {

        public static Check(object1: objects.GameObject, object2: objects.GameObject): boolean {
            // DISTANCE method
            //let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            //let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
            //if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {

            let overlaps = 5;

            let A1 = new math.Vec2(object1.x - object1.halfWidth + overlaps, object1.y - object1.halfHeight + overlaps);
            let B1 = new math.Vec2(object1.x + object1.halfWidth - overlaps, object1.y + object1.halfHeight - overlaps);

            let A2 = new math.Vec2(object2.x - object2.halfWidth + overlaps, object2.y - object2.halfHeight + overlaps);
            let B2 = new math.Vec2(object2.x + object2.halfWidth - overlaps, object2.y + object2.halfHeight - overlaps);

            //AABB Method
            //if((A1.x<=A2.x)&&(A2.x<=B1.x)&&(A1.y<=A2.y)&&(A2.y<=B1.y)){
            if (!(B1.x < A2.x || B2.x < A1.x || B1.y < A2.y || B2.y < A1.y)) {
                if (!object2.isColliding) {
                    // console.log("Collision!!!");
                    object2.isColliding = true;
                    object1.isColliding = true;

                    switch (object2.name) {
                        case "cityEnemyWolf":
                            if (object2.alpha != 0) {
                                objects.Game.livesBoard.Lives -= 1;
                                console.log("Collision Wolf Damage!!!");
                            }
                            break;
                        case "cityEnemyCorrupted":
                            if (object2.alpha != 0) {
                                objects.Game.livesBoard.Lives = 0;
                                console.log("Collision Corrupted Damage!!!");
                            }
                            break;
                        case "bullet1":
                            // if (object2.alpha == 0) {
                            //     object2.isColliding = false;
                            // }
                            // object2.alpha = 1;
                            // objects.Game.livesBoard.Lives -= 0;
                            console.log("Shooting Collision!!!");

                        default:
                            break;
                    }

                    return true;
                }
            } else {
                object2.isColliding = false;
                object1.isColliding = false;
                return false;
                // // if (object2.isColliding) {
                //     object2.isColliding = false;
                // // }
            }
        }
    }
}
