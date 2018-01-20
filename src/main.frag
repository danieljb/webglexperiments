precision mediump float;

uniform vec2 mouse;
uniform vec2 resolution;
uniform vec4 color;

void main () {
  vec2 st = gl_FragCoord.xy / resolution.xy;

  // animated input through uniforms
  // gl_FragColor = color;

  // mouse interaction
  gl_FragColor = vec4(mouse.x / resolution.x, mouse.y / resolution.y, 0., 1.);
}
