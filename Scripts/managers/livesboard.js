var managers;
(function (managers) {
    var LivesBoard = /** @class */ (function () {
        // get Score(): number {
        //     return this._score;
        // }
        // set Score(newScore: number) {
        //     this._score = newScore;
        //     this.ScoreLabel.text = "Score: " + this._score;
        // }
        // get HighScore(): number {
        //     return this._highscore;
        // }
        // set HighScore(newHighScore: number) {
        //     this._highscore = newHighScore;
        //     this.HighScoreLabel.text = "High Score: " + this._highscore;
        // }
        // constructors
        function LivesBoard() {
            this._initialize();
        }
        Object.defineProperty(LivesBoard.prototype, "Lives", {
            // public ScoreLabel: objects.Label;
            // public HighScoreLabel: objects.Label;
            // public properties
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        LivesBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Consolas", "#FF0000", 540, 50, false);
            // this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Consolas", "#FFFF00", 500, 10, false);
            // this.HighScoreLabel = new objects.Label("HighScore: 99999", "40px", "Consolas", "#FFFF00", 320, 240, true);
            this.Lives = 5;
            // this.Score = 0;
            // this.HighScore = 0;
        };
        return LivesBoard;
    }());
    managers.LivesBoard = LivesBoard;
})(managers || (managers = {}));
//# sourceMappingURL=livesboard.js.map