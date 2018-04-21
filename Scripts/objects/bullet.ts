/// <reference path = "./gameobject.ts" />
module objects {
  export class Bullet extends GameObject {
    // private instance variables
    private speedX: number;
    private speedY: number;

    // public properties
    public speed: number;
    public shootRoom: number;
    public active: boolean;
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "bullet1");
      this.Start();
    }

    // PRIVATE METHODS
    private _reset(): void {
      this.y = -1000;
      this.x = -1000;
      this.active = false;
    }

    private _checkBounds(): void {
      if (this.active&&(this.x <= 0 || this.x >= 640 || this.y <= 0 || this.y >= 480 || this.isColliding)) {
        this._reset();
      } else {
        this._updatePosition();
      }
    }

    // PUBLIC METHODS
    public Start(): void {
      this.speed = 10;
      this.shootRoom = 5; // must be a little more than half bullet+halftank
      this.rotation = 90;
      this._reset();
    }

    private _updatePosition(): void {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }

    public Update(): void {
      this._checkBounds();
    }

    public shoot(x: number, y: number, facing: number): void {
      if (facing == -90) {
        this.rotation = -90;
        this.x = x - this.shootRoom;
        this.y = y;
        this.speedX = this.speed;
        this.speedY = 0;
        this.active = true;
      }
      else if (facing == 90) {
        this.rotation = 90;
        this.x = x + this.shootRoom;
        this.y = y;
        this.speedX = -this.speed;
        this.speedY = 0;
        this.active = true;
      }
      else if (facing == 0) {
        this.rotation = 0;
        this.x = x;
        this.y = y - this.shootRoom;
        this.speedX = 0;
        this.speedY = this.speed;
        this.active = true;
      }
      else if (facing == 180) {
        this.rotation = 180;
        this.x = x;
        this.y = y + this.shootRoom;
        this.speedX = 0;
        this.speedY = -this.speed;
        this.active = true;
      }
    }

    public shootLeft(x: number, y: number): void {
      this.rotation = -90;
      this.x = x - this.shootRoom;
      this.y = y;
      this.speedX = this.speed;
      this.speedY = 0;
      this.active = true;
      this.alpha = 1;
    }
    public shootRight(x: number, y: number): void {
      this.rotation = 90;
      this.x = x + this.shootRoom;
      this.y = y;
      this.speedX = -this.speed;
      this.speedY = 0;
      this.active = true;
      this.alpha = 1;
    }
    public shootForward(x: number, y: number): void {
      this.rotation = 0;
      this.x = x;
      this.y = y - this.shootRoom;
      this.speedX = 0;
      this.speedY = this.speed;
      this.active = true;
      this.alpha = 1;
    }
    public shootBack(x: number, y: number): void {
      this.rotation = 180;
      this.x = x;
      this.y = y + this.shootRoom;
      this.speedX = 0;
      this.speedY = -this.speed;
      this.active = true;
      this.alpha = 1;
    }
  }
}