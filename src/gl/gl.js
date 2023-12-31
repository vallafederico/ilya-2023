import { Renderer } from "ogl";
import Cam from "./_camera.js";
import Scene from "./_scene.js";
import Tween from "gsap";

import { lerp } from "../util/math.js";

export default class {
  constructor() {
    this.wrapper = document.querySelector("[data-gl='c']");
    this.vp = {
      dpr: Math.min(window.devicePixelRatio, 2),
    };

    this.renderer = new Renderer({ dpr: 2, alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.vp = this.vp;

    this.wrapper.appendChild(this.gl.canvas);

    this.camera = new Cam(this.gl, {});
    this.camera.position.set(0, 0, 5);

    this.scene = new Scene(this.gl);
    this.time = 0;

    this.initEvents();
    this.render();
  }

  render(scroll = 0) {
    this.time += 0.5;

    this.mouse.lx = lerp(this.mouse.lx, this.mouse.x, 0.1);
    this.mouse.ly = lerp(this.mouse.ly, this.mouse.y, 0.1);

    this.scene?.render(this.time, scroll, this.mouse);

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });
  }

  onPageChange(slug) {
    // console.log("gl: onPageChange", slug);

    // this.scene.destroy();
    setTimeout(() => this.scene.create(), 100);
  }

  initEvents() {
    // resize
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.wrapper
    );
    // mouse
    this.mouse = { x: 0, y: 0, lx: 0, ly: 0, ex: 0, ey: 0 };

    document.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.vp.w) * 2 - 1;
      this.mouse.y = (e.clientY / this.vp.h) * -2 + 1;
      // Tween.to(this.mouse, {
      //   ex: this.mouse.x,
      //   ey: this.mouse.y,
      //   ease: "slow.out",
      //   duration: 0.8,
      // });
      // console.log(this.mouse);
    });
  }

  resize(entry) {
    const cw = entry ? entry.width : this.wrapper.clientWidth;
    const ch = entry ? entry.height : this.wrapper.clientHeight;

    this.vp.w = cw;
    this.vp.h = ch;
    this.vp.ratio = cw / ch;

    this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
    this.vp.px = this.vp.viewSize.w / this.vp.w;
    this.gl.vp = this.vp;

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.perspective({
      aspect: this.vp.ratio,
    });

    this.scene.resize(this.vp);
  }
}
