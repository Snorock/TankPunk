module objects {
    export class EnemyCity1 extends objects.GameObject {
        //   private instance variables
        private dir: boolean;
        // public properties

        // Constructor
        constructor(assetManager: createjs.LoadQueue, private coorX: number, private coorY: number, private speedDy: number, private direction: boolean, private distance: number) {
            super(assetManager, "cityEnemyWolf");
            this.x = coorX;
            this.y = coorY;
            // this._dx = sDy;
            this.Start();
        }

        // private methods

        // public methods

        // Initializes variables and creates new objects
        public Start(): void {
            // console.log("x " + this.x);
            // console.log("y " + this.y);
            this.Reset();
        }

        // // updates the game object every frame
        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        // // reset the objects location to some value
        public Reset(): void {
            // this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = this.coorY;
            // this._dx = Math.floor((Math.random() * 4) - 2);
            // this._dy = Math.floor((Math.random() * 1) - 0.5);
        }

        // // move the object to some new location
        public Move(): void {
            // this._dy = 0.3;
            this._dy = this.speedDy;
            
            if (this.direction == true) {
                if (this.y > this.coorY + this.distance) {
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
            }
            else if (this.direction == false) {
                if (this.x > this.coorX + this.distance) {
                    this.dir = true;
                    // console.log("Moving " + (this.y - this.coorY));
                }
                else if (this.x < this.coorX) {
                    this.dir = false;
                    // console.log("Stopped " + (this.y - this.coorY));
                }
    
                /* _dy is used here because _dy & _dx both are speed
                 the direction is predined, 
                 and the enemy object doesn't need to move in a slope*/
                if (this.dir) {
                    this.x -= this._dy;
                }
                else if (!this.dir) {
                    this.x += this._dy;
                } 
            }
        }

        // check to see if some boundary has been passed
        public CheckBounds(): void {
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
