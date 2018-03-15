module managers {
    export class Collision {

        public static Check(object1: objects.GameObject, object2: objects.GameObject) {
            // DISTANCE method
            //let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            //let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
            //if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {

            //AABB Method
            if((object1.A.x<=object2.A.x)&&(object2.A.x<=object1.B.x)&&(object1.A.y<=object2.A.y)&&(object2.A.y<=object2.B.y)){
                if (!object2.isColliding) {
                    console.log("Collision!!!");
                    object2.isColliding = true;
                }
            } else {
                object2.isColliding = false;
            }
        }
    }
}
