import { Texture } from "ogl";

export async function loadTexture(gl, path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.src = path;
    img.onload = () => {
      const texture = new Texture(gl, { image: img });
      texture.wh = [img.width, img.height];

      resolve(texture);
    };
  });
}
