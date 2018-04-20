/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    // Story Atlas Begin
    var textureAtlasDataIntro;
    var textureAtlasIntro;
    var textureAtlasDataStory01;
    var textureAtlasStory01;
    var textureAtlasDataStory02;
    var textureAtlasStory02;
    var textureAtlasDataStory02p1;
    var textureAtlasStory02p1;
    var textureAtlasDataStory02p2;
    var textureAtlasStory02p2;
    var textureAtlasDataStory02p3;
    var textureAtlasStory02p3;
    var textureAtlasDataStory03;
    var textureAtlasStory03;
    var textureAtlasDataStory04;
    var textureAtlasStory04;
    // Story Atlas End
    textureAtlasDataIntro = {
        "images": [
            ""
        ],
        "frames": [
            [2, 2, 43, 47, 0, 0, 0],
            [47, 2, 42, 46, 0, 0, 0],
            [91, 2, 640, 480, 0, 0, 0],
            [733, 2, 640, 480, 0, 0, 0],
            [1375, 2, 640, 480, 0, 0, 0],
            [2017, 2, 640, 480, 0, 0, 0],
            [2659, 2, 640, 480, 0, 0, 0],
            [3301, 2, 640, 480, 0, 0, 0],
            [3943, 2, 640, 480, 0, 0, 0],
            [4585, 2, 640, 480, 0, 0, 0],
            [5227, 2, 640, 480, 0, 0, 0],
            [5869, 2, 640, 480, 0, 0, 0],
            [6511, 2, 640, 480, 0, 0, 0],
            [7153, 2, 640, 480, 0, 0, 0],
            [7795, 2, 640, 480, 0, 0, 0],
            [8437, 2, 640, 480, 0, 0, 0],
            [9079, 2, 640, 480, 0, 0, 0],
            [9721, 2, 640, 480, 0, 0, 0],
            [10363, 2, 640, 480, 0, 0, 0],
            [11005, 2, 640, 480, 0, 0, 0],
            [11647, 2, 640, 480, 0, 0, 0],
            [12289, 2, 640, 480, 0, 0, 0],
            [12931, 2, 640, 480, 0, 0, 0],
            [13573, 2, 640, 480, 0, 0, 0],
            [14215, 2, 640, 480, 0, 0, 0],
            [14857, 2, 640, 480, 0, 0, 0],
            [15499, 2, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "tankflash": {
                "frames": [0, 1, 0, 1, 0, 1, 0, 1],
                "speed": 0.08
            },
            "introstory": {
                "frames": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
                    7, 8, 9, 10, 11, 12, 13, 14, 15,
                    16, 16, 16, 16, 16, 16, 16, 16,
                    16, 16, 16, 16, 16, 16, 16, 16,
                    16, 16, 16, 16, 16, 16, 16, 16,
                    17, 18, 19,
                    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                    21, 22,
                    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                    25, 26],
                "speed": 0.05
            },
        },
    };
    textureAtlasDataStory01 = {
        "images": [
            ""
        ],
        "frames": [
            [1, 1, 640, 480, 0, 0, 0],
            [643, 1, 640, 480, 0, 0, 0],
            [1285, 1, 640, 480, 0, 0, 0],
            [1927, 1, 640, 480, 0, 0, 0],
            [2569, 1, 640, 480, 0, 0, 0],
            [3211, 1, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "story01": {
                "frames": [2, 2, 1, 1,
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                    1, 2,
                    3, 3, 3, 3, 3, 3, 3,
                    3, 3, 3, 3, 3, 3, 3,
                    3, 3, 3, 3, 3, 3, 3,
                    3, 3, 3, 3, 3, 3, 3,
                    3, 3, 3, 3, 3, 3, 3,
                    3, 3, 3, 3, 3, 3, 3,
                    4, 5],
                "speed": 0.05
            },
        },
    };
    textureAtlasDataStory02p1 = {
        "images": [
            ""
        ],
        "frames": [
            [1, 1, 640, 480, 0, 0, 0],
            [643, 1, 640, 480, 0, 0, 0],
            [1285, 1, 640, 480, 0, 0, 0],
            [1927, 1, 640, 480, 0, 0, 0],
            [2569, 1, 640, 480, 0, 0, 0],
            [3211, 1, 640, 480, 0, 0, 0],
            [1, 483, 640, 480, 0, 0, 0],
            [643, 483, 640, 480, 0, 0, 0],
            [1285, 483, 640, 480, 0, 0, 0],
            [1927, 483, 640, 480, 0, 0, 0],
            [2569, 483, 640, 480, 0, 0, 0],
            [3211, 483, 640, 480, 0, 0, 0],
            [1, 965, 640, 480, 0, 0, 0],
            [643, 965, 640, 480, 0, 0, 0],
            [1285, 965, 640, 480, 0, 0, 0],
            [1927, 965, 640, 480, 0, 0, 0],
            [2569, 965, 640, 480, 0, 0, 0],
            [3211, 965, 640, 480, 0, 0, 0],
            [1, 1447, 640, 480, 0, 0, 0],
            [643, 1447, 640, 480, 0, 0, 0],
            [1285, 1447, 640, 480, 0, 0, 0],
            [1927, 1447, 640, 480, 0, 0, 0],
            [2569, 1447, 640, 480, 0, 0, 0],
            [3211, 1447, 640, 480, 0, 0, 0],
            [1, 1929, 640, 480, 0, 0, 0],
            [643, 1929, 640, 480, 0, 0, 0],
            [1285, 1929, 640, 480, 0, 0, 0],
            [1927, 1929, 640, 480, 0, 0, 0],
            [2569, 1929, 640, 480, 0, 0, 0],
            [3211, 1929, 640, 480, 0, 0, 0],
            [1, 2411, 640, 480, 0, 0, 0],
            [643, 2411, 640, 480, 0, 0, 0],
            [1285, 2411, 640, 480, 0, 0, 0],
            [1927, 2411, 640, 480, 0, 0, 0],
            [2569, 2411, 640, 480, 0, 0, 0],
            [3211, 2411, 640, 480, 0, 0, 0],
            [1, 2893, 640, 480, 0, 0, 0],
            [643, 2893, 640, 480, 0, 0, 0],
            [1285, 2893, 640, 480, 0, 0, 0],
            [1927, 2893, 640, 480, 0, 0, 0],
            [2569, 2893, 640, 480, 0, 0, 0],
            [3211, 2893, 640, 480, 0, 0, 0],
            [1, 3375, 640, 480, 0, 0, 0],
            [643, 3375, 640, 480, 0, 0, 0],
            [1285, 3375, 640, 480, 0, 0, 0],
            [1927, 3375, 640, 480, 0, 0, 0],
            [2569, 3375, 640, 480, 0, 0, 0],
            [3211, 3375, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "story02p1": {
                "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
                    44, 45, 46, 47],
                next: false,
                "speed": 0.25
            },
        },
    };
    textureAtlasDataStory02p2 = {
        "images": [
            ""
        ],
        "frames": [
            [1, 1, 640, 480, 0, 0, 0],
            [1, 483, 640, 480, 0, 0, 0],
            [1, 965, 640, 480, 0, 0, 0],
            [1, 1447, 640, 480, 0, 0, 0],
            [1, 1929, 640, 480, 0, 0, 0],
            [1, 2411, 640, 480, 0, 0, 0],
            [1, 2893, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "story02p2": {
                "frames": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    5, 6,
                ],
                "speed": 0.05
            },
        },
    };
    textureAtlasDataStory03 = {
        "images": [
            ""
        ],
        "frames": [
            [1, 1, 640, 480, 0, 0, 0],
            [643, 1, 640, 480, 0, 0, 0],
            [1285, 1, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "story03": {
                "frames": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 2,
                ],
                "speed": 0.05
            },
        },
    };
    textureAtlasDataStory04 = {
        "images": [
            ""
        ],
        "frames": [
            [1, 1, 640, 480, 0, 0, 0],
            [643, 1, 640, 480, 0, 0, 0],
            [1285, 1, 640, 480, 0, 0, 0]
        ],
        "animations": {
            "story04": {
                "frames": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 2,
                ],
                "speed": 0.05
            },
        },
    };
    assetManifest = [
        // texture atlas
        { id: "textureAtlasIntro", src: "./Assets/sprites/textureAtlasIntro.png" },
        { id: "textureAtlasStory01", src: "./Assets/sprites/textureAtlasStory01.png" },
        { id: "textureAtlasStory02", src: "./Assets/sprites/textureAtlasStory02.png" },
        { id: "textureAtlasStory02p1", src: "./Assets/sprites/textureAtlasStory02_event02_p1.png" },
        { id: "textureAtlasStory02p2", src: "./Assets/sprites/textureAtlasStory02_event02_p2.png" },
        { id: "textureAtlasStory02p3", src: "./Assets/sprites/textureAtlasStory02_event02_p3.png" },
        { id: "textureAtlasStory03", src: "./Assets/sprites/textureAtlasStory03.png" },
        { id: "textureAtlasStory04", src: "./Assets/sprites/textureAtlasStory04.png" },
        { id: "textureAtlas", src: "./Assets/images/tanks/dark-tank-up-transparent.png" },
        { id: "startGameBackground", src: "./Assets/images/milestones/background-start-game.png" },
        { id: "gameOverBackground", src: "./Assets/images/milestones/background-game-over.png" },
        { id: "startButton", src: "./Assets/images/buttons/start-button.png" },
        { id: "exitButton", src: "./Assets/images/buttons/exit-button.png" },
        { id: "nextButton", src: "./Assets/images/buttons/next-button.png" },
        { id: "backButton", src: "./Assets/images/buttons/back-button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "cityBackground", src: "./Assets/images/levels/city/background-level-1-with-trees.png" },
        { id: "desertBackground", src: "./Assets/images/levels/desert/background-level-2.png" },
        { id: "frostBackground", src: "./Assets/images/levels/frost/background-level-3.png" },
        { id: "rock", src: "./Assets/images/levels/frost/rock.png" },
        { id: "whiteExit", src: "./Assets/images/exit-white.png" },
        { id: "blackExit", src: "./Assets/images/plane.png" },
        { id: "cityObstHouse1", src: "./Assets/images/metal-crate.png" },
        { id: "cityObstCar1", src: "./Assets/images/wood-crate.png" },
        { id: "desertTree", src: "./Assets/images/levels/desert/desert-tree.png" },
        { id: "green-tank", src: "./Assets/images/tanks/green-tank.png" },
        { id: "blue-tank", src: "./Assets/images/tanks/blue-tank.png" },
        { id: "dark-tank", src: "./Assets/images/tanks/dark-tank.png" },
        { id: "light-tank", src: "./Assets/images/tanks/light-tank.png" },
        { id: "bullet1", src: "./Assets/images/bullet1.png" },
        { id: "dark-tank-up", src: "./Assets/images/tanks/dark-tank-up.png" },
        { id: "dark-tank-down", src: "./Assets/images/tanks/dark-tank-down.png" },
        { id: "dark-tank-left", src: "./Assets/images/tanks/dark-tank-left.png" },
        { id: "dark-tank-right", src: "./Assets/images/tanks/dark-tank-right.png" },
        { id: "dark-tank-up-transparent", src: "./Assets/images/tanks/dark-tank-up-transparent.png" },
        { id: "dark-tank-down-transparent", src: "./Assets/images/tanks/dark-tank-down-transparent.png" },
        { id: "dark-tank-left-transparent", src: "./Assets/images/tanks/dark-tank-left-transparent.png" },
        { id: "dark-tank-right-transparent", src: "./Assets/images/tanks/dark-tank-right-transparent.png" },
        // TODO: Replace assets below
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "city", src: "./Assets/images/city1.png" },
        { id: "cityObstHouse2", src: "./Assets/images/Building1Small.png" },
        { id: "cityEnemyWolf", src: "./Assets/images/enemyWolf.png" },
        { id: "cityEnemyCorrupted", src: "./Assets/images/enemyCorrupted.png" },
        { id: "tutorialLevel", src: "./Assets/images/TutorialLevel.png" },
        { id: "desert", src: "./Assets/images/desert.png" },
        { id: "island", src: "./Assets/images/island.png" },
        { id: "cloud", src: "./Assets/images/cloud.png" },
    ];
    // let imgArray: Array<string> = ["tank", "island"];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        // Story Atlas
        textureAtlasDataIntro.images = [assetManager.getResult("textureAtlasIntro")];
        textureAtlasIntro = new createjs.SpriteSheet(textureAtlasDataIntro);
        textureAtlasDataStory01.images = [assetManager.getResult("textureAtlasStory01")];
        textureAtlasStory01 = new createjs.SpriteSheet(textureAtlasDataStory01);
        textureAtlasDataStory02p1.images = [assetManager.getResult("textureAtlasStory02p1")];
        textureAtlasStory02p1 = new createjs.SpriteSheet(textureAtlasDataStory02p1);
        textureAtlasDataStory02p2.images = [assetManager.getResult("textureAtlasStory02p2")];
        textureAtlasStory02p2 = new createjs.SpriteSheet(textureAtlasDataStory02p2);
        textureAtlasDataStory03.images = [assetManager.getResult("textureAtlasStory03")];
        textureAtlasStory03 = new createjs.SpriteSheet(textureAtlasDataStory03);
        textureAtlasDataStory04.images = [assetManager.getResult("textureAtlasStory04")];
        textureAtlasStory04 = new createjs.SpriteSheet(textureAtlasDataStory04);
        // Story Atlas End
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        objects.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        // Story Atlas
        managers.Game.textureAtlasIntro = textureAtlasIntro;
        managers.Game.textureAtlasStory01 = textureAtlasStory01;
        managers.Game.textureAtlasStory02p1 = textureAtlasStory02p1;
        managers.Game.textureAtlasStory02p2 = textureAtlasStory02p2;
        managers.Game.textureAtlasStory03 = textureAtlasStory03;
        managers.Game.textureAtlasStory04 = textureAtlasStory04;
        // Story Atlas End
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != objects.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (objects.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene(assetManager);
                break;
            case config.Scene.INTRO:
                currentScene = new scenes.Story00Scene(assetManager);
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene(assetManager);
                break;
            case config.Scene.STORY01:
                currentScene = new scenes.Story01Scene(assetManager);
                break;
            case config.Scene.CITY:
                currentScene = new scenes.CityScene(assetManager);
                break;
            case config.Scene.STORY02:
                currentScene = new scenes.Story02Scene(assetManager);
                break;
            case config.Scene.STORY02p2:
                currentScene = new scenes.Story02p2Scene(assetManager);
                break;
            case config.Scene.DESERT:
                currentScene = new scenes.DesertScene(assetManager);
                break;
            case config.Scene.STORY03:
                currentScene = new scenes.Story03Scene(assetManager);
                break;
            case config.Scene.FROST:
                currentScene = new scenes.FrostScene(assetManager);
                break;
            case config.Scene.STORY04:
                currentScene = new scenes.Story04Scene(assetManager);
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene(assetManager);
                break;
        }
        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map