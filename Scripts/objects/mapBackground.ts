module objects {
  export class MapBackground extends createjs.Bitmap {

    constructor(assetManager: createjs.LoadQueue, imageName: String) {
      super(assetManager.getResult(imageName));
    }
    
  }
}
  