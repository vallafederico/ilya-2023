import { Program, Texture } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, opt = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
      transparent: true,
      cullFace: null,
    });

    this.uniforms = {
      u_time: { value: 0 },
      u_diff: { value: new Texture(gl) },
      u_diff_wh: { value: [0, 0] },
      u_x: { value: 0 },
      u_p: { value: [1, 1, 1, 1] },
      u_mouse: { value: [0, 0] },
      // animations
      u_a_clicked: { value: 0 },
      u_a_hover: { value: 0 },
      u_a_loaded: { value: 0 },
      u_a_enter: { value: 0 },
      u_a_mode: { value: 0 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set up(arr) {
    this.uniforms.u_p.value = arr;
  }

  set x(val) {
    this.uniforms.u_x.value = val;
  }

  set a({ clicked, hover, loaded, listMode }) {
    this.uniforms.u_a_clicked.value = clicked;
    this.uniforms.u_a_hover.value = hover;
    // this.uniforms.u_a_enter.value = enter;
    this.uniforms.u_a_loaded.value = loaded;
    this.uniforms.u_a_mode.value = listMode;
  }

  set mouse(arr) {
    this.uniforms.u_mouse.value = arr;
  }
}
