/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function () {

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;

  assetManifest = [
    { id: "startGameBackground", src: "./Assets/images/milestones/background-start-game.png" },
    { id: "gameOverBackground", src: "./Assets/images/milestones/background-game-over.png" },
    { id: "startButton", src: "./Assets/images/buttons/start-button.png" },
    { id: "exitButton", src: "./Assets/images/buttons/exit-button.png" },
    { id: "nextButton", src: "./Assets/images/buttons/next-button.png" },
    { id: "backButton", src: "./Assets/images/buttons/back-button.png" },
    { id: "nextButton", src: "./Assets/images/nextButton.png" },
    { id: "cityBackground", src: "./Assets/images/levels/city/background-level-1-with-trees.png" },
    { id: "desertBackground", src: "./Assets/images/levels/desert/background-level-2.png" },
    { id: "cityObstHouse1", src: "./Assets/images/levels/city/house.png" },
    { id: "desertTree", src: "./Assets/images/levels/desert/desert-tree.png" },
    { id: "green-tank", src: "./Assets/images/tanks/green-tank.png" },
    { id: "blue-tank", src: "./Assets/images/tanks/blue-tank.png" },
    { id: "dark-tank", src: "./Assets/images/tanks/dark-tank.png" },
    { id: "light-tank", src: "./Assets/images/tanks/light-tank.png" },
    { id: "bullet1", src: "./Assets/images/bullet1.png" },
    // TODO: Replace assets below
    { id: "ocean", src: "./Assets/images/ocean.gif" },
    { id: "city", src: "./Assets/images/city1.png" },
    { id: "cityObstCar1", src: "./Assets/images/flamingCarSmall.png" },
    { id: "cityObstHouse2", src: "./Assets/images/Building1Small.png" },
    { id: "cityEnemyWolf", src: "./Assets/images/enemyWolf.png" },
    { id: "cityEnemyCorrupted", src: "./Assets/images/enemyCorrupted.png" },
    { id: "desert", src: "./Assets/images/desert.png" },
    { id: "frost", src: "./Assets/images/frost.png" },
    { id: "test", src: "./Assets/images/test.png" },
    { id: "island", src: "./Assets/images/island.png" },
    { id: "cloud", src: "./Assets/images/cloud.png" },
  ];

  // let imgArray: Array<string> = ["tank", "island"];
  // preloads assets
  function Init(): void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start(): void {
    console.log("Starting Application...")

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    objects.Game.stage = stage;
    objects.Game.currentScene = config.Scene.CITY;
    currentState = config.Scene.CITY;

    keyboardManager = new managers.Keyboard();
    objects.Game.keyboardManager = keyboardManager;

    Main();
  }

  function Update(): void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if (currentState != objects.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main(): void {
    stage.removeAllChildren();

    switch (objects.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene(assetManager);
        break;
      case config.Scene.PLAY:
        currentScene = new scenes.PlayScene(assetManager);
        break;
      case config.Scene.CITY:
        currentScene = new scenes.CityScene(assetManager);
        break;
      case config.Scene.DESERT:
        currentScene = new scenes.DesertScene(assetManager);
        break;
      case config.Scene.FROST:
        currentScene = new scenes.FrostScene(assetManager);
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
