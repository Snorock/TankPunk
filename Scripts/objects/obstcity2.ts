module objects {
    export class ObstCity2 extends objects.GameObject {
        //   private instance variables

        // public properties

        // Constructor
        constructor(assetManager: createjs.LoadQueue, /*obst1: objects.GameObject*/private coorX: number, private coorY: number) {
            super(assetManager, "cityObstHouse2");
            // let obstBuilding = new math.Vec2(obst1.x, obst1.y);
            this.x = coorX;
            this.y = coorY;
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
        public Update(): void {
            // this.Move();
            this.CheckBounds();
        }

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
        public CheckBounds(): void {
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


        }
    }
}
