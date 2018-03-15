/// <reference path = "./gameobject.ts" />
module objects {
    export class Bullet extends GameObject {
      // private instance variables
  
      // public properties
      public speed: number;
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
        if (this.y <= 0 + this.height) {
          this._reset();
        }
      }
  
      // PUBLIC METHODS
      public Start(): void {
        this.speed = -10;
        this._reset();
      }
  
      private _updatePosition(): void {
        this.y += this.speed;
      }
  
      public Update(): void {
        if(this.y > 0) {
          this._updatePosition();
          this._checkBounds();
        }
      }
    }
  }