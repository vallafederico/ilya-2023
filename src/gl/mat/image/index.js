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
}
