/// <reference path = "./gameobject.ts" />
module objects {
    export class Bullet extends GameObject {
      // private instance variables
      private speedX:number;
      private speedY:number;
      // public properties
      public speed: number;
      public shootRoom: number;
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager, "island");
        this.Start();
      }
  
       // PRIVATE METHODS
    private _reset(): void {
        this.y = -1000;
        this.x = -1000;
      }
  
      private _checkBounds(): void {
        if (this.x<=0||this.x>=640||this.y <= 0 ||this.y>=480|| this.isColliding) {
          this._reset();
        } else {
          this._updatePosition();
        }
      }
  
      // PUBLIC METHODS
      public Start(): void {
        this.speed = 10;
        this.shootRoom = 100; // must be a little more than half bullet+halftank
        this._reset();
      }
  
      private _updatePosition(): void {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
      }
  
      public Update(): void {          
          this._checkBounds();
      }
      public shootLeft(x:number,y:number):void{
        console.log("L");
        this.x = x - this.shootRoom;
        this.y=y;
        this.speedX = -this.speed;
        this.speedY=0;
        console.log(this.speedX);
      }
      public shootRight(x:number,y:number):void{
        console.log("R");
        this.x = x + this.shootRoom;
        this.y=y;
        this.speedX = this.speed;
        this.speedY=0;
      }
      public shootForward(x:number,y:number):void{
        this.x = x;
        this.y=y - this.shootRoom;
        this.speedX =0;
        this.speedY= -this.speed;
        console.log(this.speedY);
      }
      public shootBack(x:number,y:number):void{
        console.log("B");
        this.x = x;
        this.y=y + this.shootRoom;
        this.speedX =0;
        this.speedY= this.speed;
      }
    }
  }