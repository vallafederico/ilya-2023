import { Plane, Mesh } from "ogl";
import Material from "./mat/image";
import { clientRectGl } from "../util/clientRect.js";
import { loadTexture } from "./util/texture-loader.js";

export class Image extends Mesh {
  constructor(gl, { el, src }) {
    super(gl, {
      geometry: new Plane(gl),
      program: new Material(gl),
    });

    this.gl = gl;
    this.el = el;
    this.src = src;

    this.resize();
    this.load();
  }

  async load() {
    this.tx = await loadTexture(this.gl, this.src);
    this.program.uniforms.u_diff.value = this.tx;
    this.program.uniforms.u_diff_wh.value = this.tx.wh;

    this.el.style.visibility = "hidden";
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

  render(t, x) {
    this.program.time = t;
    this.program.x = x;
  }
}
