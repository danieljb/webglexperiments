precision mediump float;

uniform vec2 resolution;
uniform vec4 color;

void main () {
  vec2 st = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = vec4(st.x, st.y, 0., 1.);
}
