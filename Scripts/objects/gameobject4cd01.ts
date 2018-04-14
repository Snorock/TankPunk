module objects {
    export class GameObject4cd01 extends createjs.Sprite {
      // private instance variables
      protected _dx: number;
      protected _dy: number;
  
      // public properties
      public tag: String;
      public width: number;
      public height: number;
      public halfWidth: number;
      public halfHeight: number;
      public isColliding: boolean;
      // public A: math.Vec2; //left apper corner
      // public B: math.Vec2; //right bottom corner
  
      // constructors
      constructor(imageString:string) {
        super(managers.Game.textureAtlasStory02p1, imageString);
        this.name = imageString;
        this._initialize();
    }
      // private methods
      private _initialize(t ?: String):void {
        if(t){
          this.tag = t;
        } else {
          this.tag = "";
        }
        this.width = this.getBounds().width;
        this.height = this.getBounds().height;
        this.halfWidth = this.width * 0.5;
        this.halfHeight = this.height * 0.5;
        this.regX = this.halfWidth;
        this.regY = this.halfHeight;
        // this.A = new math.Vec2(this.x-this.halfWidth, this.y-this.halfHeight); 
        // this.B = new math.Vec2(this.x+this.halfWidth, this.y+this.halfHeight);
        this.isColliding = false;
      }
  
      // public methods
      public Start(): void {
  
      }
  
      public Update(): void {
  
      }
  
      public Reset():void {
  
      }
  
      public CheckBounds():void {
  
      }
  
      public Move():void {
  
      }
    }
  }
  