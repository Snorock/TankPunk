module managers {
  export class Keyboard {
    // private instance variables

    // public instance variables
    public moveForward: boolean;
    public moveBackward: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;
    public jump: boolean;
    public enabled: boolean;
    public paused: boolean;
    public shootForward: boolean;
    public shootBackward: boolean;
    public shootLeft: boolean;
    public shootRight: boolean;

    // constructors
    constructor() {
      this.enabled = true;
      document.addEventListener('keydown', this.onKeyDown.bind(this), false);
      document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    // private methods

    // public methods
    public onKeyDown(event: KeyboardEvent): void {
      switch (event.keyCode) {
        case config.Keys.W:
          this.moveForward = true;
          break;

        case config.Keys.A:
          this.moveLeft = true;
          break;

        case config.Keys.S:
          this.moveBackward = true;
          break;

        case config.Keys.D:
          this.moveRight = true;
          break;

        case config.Keys.UP_ARROW:
          this.shootForward = true;
          break;
        case config.Keys.LEFT_ARROW:
          this.shootLeft = true;
          break;
        case config.Keys.RIGHT_ARROW:
          this.shootRight = true;
          break;
        case config.Keys.DOWN_ARROW:
          this.shootBackward = true;
          break;

        case config.Keys.SPACE:
          this.jump = true;
          break;

      }
    }

    public onKeyUp(event: KeyboardEvent): void {
      switch (event.keyCode) {case config.Keys.W:
        this.moveForward = false;
        break;
      case config.Keys.A:
        this.moveLeft = false;
        break;
      case config.Keys.S:
        this.moveBackward = false;
        break;
      case config.Keys.D:
        this.moveRight = false;
        break;

      case config.Keys.UP_ARROW:
        this.moveForward = false;
        break;
      case config.Keys.LEFT_ARROW:
        this.shootLeft;
        break;
      case config.Keys.RIGHT_ARROW:
        this.shootRight = false;
        break;
      case config.Keys.DOWN_ARROW:
        this.shootBackward = false;
        break;

        case config.Keys.SPACE:
          this.jump = false;
          break;

      }
    }
  }
}
