import { Transform } from "ogl";
import { Image } from "./image.js";

export default class extends Transform {
  constructor(gl, data = {}) {
    super();
    this.gl = gl;
    this.isOn = true;

    // load
    setTimeout(() => this.create(), 1);
  }

  create() {
    this.images = [...document.querySelectorAll(".cover-img")].map(
      (item, i) => {
        const img = new Image(this.gl, {
          el: item.parentElement,
          src: item.src,
        });

        this.addChild(img);
        return img;
      }
    );
  }

  resize(vp) {
    this.vp = vp;
    this.images?.forEach((item) => item.resize(vp));
  }

  render(t, scroll) {
    if (!this.isOn) return;

    const x = scroll * window.app?.gl.vp.px || 0;
    this.images?.forEach((item) => item.render(t, x));
  }
}
