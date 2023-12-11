precision highp float;

uniform sampler2D u_diff;

varying vec3 v_normal;
varying vec2 v_uv;



void main() {

  vec3 diff = texture2D(u_diff, v_uv).rgb;

  gl_FragColor.rgb = diff;
  // gl_FragColor.rgb = vec3(v_uv, 2.);
  gl_FragColor.a = 1.;
}
