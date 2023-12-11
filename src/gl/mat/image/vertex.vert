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


void main() {
  vec3 pos = position;
  
  // ** pos + mov
  pos.xy *= u_p.zw;
  pos.x += u_p.x - u_x;
  pos.y += u_p.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_normal = normalize(normalMatrix * normal);
  v_uv = imageuv(uv, u_diff_wh, u_p.zw);
  
}
