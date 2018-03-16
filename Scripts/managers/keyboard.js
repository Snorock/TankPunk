var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // constructors
        function Keyboard() {
            this.enabled = true;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        Keyboard.prototype.onKeyDown = function (event) {
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
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
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
                    this.shootForward = false;
                    break;
                case config.Keys.LEFT_ARROW:
                    this.shootLeft = false;
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
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map