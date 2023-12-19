import { Plane, Mesh } from "ogl";
import Tween from "gsap";

import Material from "./mat/image";
import { clientRectGl } from "../util/clientRect.js";
import { loadTexture } from "./util/texture-loader.js";

import { Observe } from "../util/observe.js";

export class Image extends Mesh {
  a = {
    loaded: 0,
    clicked: 0,
    hover: 0,
    enter: 1,
    listMode: 0,
  };

  constructor(gl, { el, src, index }) {
    super(gl, {
      geometry: new Plane(gl),
      program: new Material(gl),
      frustumCulled: false,
    });

    this.gl = gl;
    this.el = el;
    this.src = src;
    this.index = index;

    this.trigger = el.parentElement;

    this.resize();
    this.load();
  }

  async load() {
    this.tx = await loadTexture(this.gl, this.src);
    this.program.uniforms.u_diff.value = this.tx;
    this.program.uniforms.u_diff_wh.value = this.tx.wh;

    this.el.style.visibility = "hidden";

    // * animate loaded
    Tween.to(this.a, {
      loaded: 1,
      ease: "expo.out",
      duration: 1.2,
    });

    this.initEvents();
  }

  resize() {
    const cr = clientRectGl(this.el);

    this.program.up = [
      -cr.ww / 2 + cr.left + cr.width / 2,
      cr.wh / 2 - cr.top - cr.height / 2,
      cr.width,
      cr.height,
    ];
  }

  render(t, x, mouse) {
    this.program.time = t;
    this.program.x = x;
    this.program.mouse = [mouse.lx, mouse.ly];

    this.program.a = this.a;
  }

  /** Lifecycle */
  transitionOut() {
    this.destroy();
    this.onOut(0.8);
  }

  destroy() {
    this.trigger.onclick = null;
    this.trigger.onmouseenter = null;
    this.trigger.onmouseleave = null;
    // this.obs?.stop();
  }

  /** Animations */
  initEvents() {
    this.trigger.onclick = () => this.onClick();
    this.trigger.onmouseenter = () => this.onHover(true);
    this.trigger.onmouseleave = () => this.onHover(false);

    this.obs = new Observe(this.trigger, {
      config: {
        autoStart: true,
      },
      cb: {
        // in: this.onIn.bind(this),
        out: this.onOut.bind(this),
      },
    });

    // temp
    // function that reads keyboard key

    document.addEventListener("keydown", (e) => {
      // console.log(e.key);
      if (e.key === "t") {
        this.toggleListMode();
      }
    });
  }

  onHover(val) {
    Tween.to(this.a, {
      hover: val ? 1 : 0,
      ease: "expo.out",
      duration: 0.8,
    });
  }

  onClick() {
    if (this.animationClick) this.animationClick.kill();
    this.animationClick = Tween.to(this.a, {
      clicked: this.a.clicked > 0.5 ? 0 : 1,
      ease: "expo.out",
      duration: 0.8,
    });

    window.app.gl.scene.state.currentClicked = this.index;
  }

  onOut(dur) {
    if (this.animationClick) this.animationClick.kill();
    this.animationClick = Tween.to(this.a, {
      clicked: 0,
      // enter: 0,
      ease: "expo.out",
      duration: dur || 1.2,
    });
  }

  toggleView() {
    Tween.to(this.a, {
      listMode: this.a.listMode > 0.5 ? 0 : 1,
      ease: "expo.out",
      delay: 0.8,
      duration: 1.2,
    });
  }
}
