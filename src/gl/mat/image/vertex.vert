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

varying vec3 v_normal;
varying vec2 v_uv;

#include '../imageuv.glsl'

// animation
uniform float u_a_clicked;
uniform float u_a_loaded;
uniform float u_a_enter;
uniform float u_a_hover;





void main() {
  vec3 pos = position;
  

  // * animation
  pos.x += 1.;
  pos.x *= u_a_enter; // * in view
  pos.x -= 1.;
  
  pos.xy *= 1. + u_a_clicked + u_a_hover * .2; // * clicked state

  // ** scale 
  pos.xy *= u_p.zw;

  // * animation
  // pos.xy *=  u_a_loaded; // * loaded state

  // ** pos + mov
  pos.x += u_p.x - u_x; // scroll
  pos.y += u_p.y;




  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_normal = normalize(normalMatrix * normal);

  vec2 mod_uv = uv;
  mod_uv -= .5;

  mod_uv.x *= u_a_enter;
  mod_uv.xy *= .5 + u_a_enter * .5;
  mod_uv.xy *= .6 + u_a_clicked * .3 + u_a_hover * .1;



  mod_uv += .5;

  v_uv = imageuv(mod_uv, u_diff_wh, u_p.zw);
  
}
