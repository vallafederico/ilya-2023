import { Transform } from "ogl";
import { Image } from "./image.js";

export default class extends Transform {
  state = {
    currentClicked: null,
  };

  constructor(gl) {
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
          index: i,
        });

        this.addChild(img);
        return img;
      }
    );
  }

  destroy() {
    this.images.forEach((item) => {
      item.destroy();
      this.removeChild(item);
    });
  }

  resize(vp) {
    this.vp = vp;
    this.images?.forEach((item) => item.resize(vp));
  }

  render(t, scroll) {
    if (!this.isOn) return;
    // console.log("render", scroll);

    const x = scroll * window.app?.gl.vp.px || 0;
    this.images?.forEach((item) => item.render(t, x));
  }

  /** LifeCycle */
  transitionOut() {
    this.images.map((item) => item.transitionOut());

    return new Promise((resolve) => {
      setTimeout(() => {
        this.destroy();
        resolve();
      }, 900);
    });
  }
  /** Animation */
}
