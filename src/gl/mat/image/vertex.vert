#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float u_time;
uniform float u_x;
uniform vec4 u_p;
uniform vec2 u_diff_wh;
uniform vec2 u_mouse;

varying vec3 v_normal;
varying vec2 v_uv;

#include '../imageuv.glsl'


// animation
uniform float u_a_mode;
uniform float u_a_clicked;
uniform float u_a_loaded;
uniform float u_a_enter;
uniform float u_a_hover;





void main() {
  vec3 pos = position;
  vec3 pos1 = position;
  vec3 pos2 = position;
  

  /** pos 1 */
  // * animation
  pos1.y += 1.;
  pos1.y *= u_a_loaded; // * loaded state
  pos1.y -= 1.;
  
  pos1.xy *= 1. + u_a_clicked + u_a_hover * .2; // * clicked state

  // ** scale 
  pos1.xy *= u_p.zw;

  // ** pos + mov
  pos1.x += u_p.x - u_x; // scroll
  pos1.y += u_p.y;

  /** pos 2 */
  pos2.xy *= u_p.zw;
  pos2.xy += u_mouse;

  
  
  
  /** final position */ vec3 final_pos = mix(pos1, pos2, u_a_mode);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(final_pos, 1.0);
  v_normal = normalize(normalMatrix * normal);

  vec2 mod_uv = uv;
  mod_uv -= .5;

  mod_uv.y *= u_a_loaded; // * loaded state
  mod_uv.xy *= .5 + u_a_loaded * .5; // * loaded state
  mod_uv.xy *= .6 + u_a_clicked * .3 + u_a_hover * .1;



  mod_uv += .5;

  v_uv = imageuv(mod_uv, u_diff_wh, u_p.zw);
  
}
