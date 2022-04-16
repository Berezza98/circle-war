export default class Assets {
  static loaded = false;
  static images = {};

  static async load(config) {
    if (Assets.loaded) return;
  
    const { images } = config

    await Promise.all([
      Assets.loadImages(images),
    ]);

    Assets.loaded = true;
  }

  static async loadImages(imagesConfig) {
    const promises = Object.entries(imagesConfig).map(([key, value]) => {
      return new Promise((res, rej) => {
        const image = new Image();

        image.addEventListener('load', (e) => {
          Assets.images[key] = image;
          res();
        });

        image.addEventListener('error', (e) => {
          rej();
        });

        image.src = value;
      });
    });

    await Promise.all(promises);
  }
}