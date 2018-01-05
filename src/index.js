
import createREGL from 'regl';


let regl;


const drawTriangle = (regl) => regl({
  frag: `
    precision mediump float;

    uniform vec2 resolution;
    uniform vec4 color;

    void main () {
      vec2 st = gl_FragCoord.xy / resolution.xy;
      gl_FragColor = vec4(st.x, st.y, 0., 1.);
    }
  `,

  vert: `
    precision mediump float;

    attribute vec2 position;

    void main () {
      gl_Position = vec4(position, 0, 1.);
    }
  `,

  attributes: {
    position: [
      [-.8, 0],
      [0, -.8],
      [.8, .8],
    ],
  },

  uniforms: {
    time: (context) => context.time,
    resolution: (context) => [
      context.viewportWidth,
      context.viewportHeight,
    ],
    color: (context, props, batchId) => [
      (context.tick % 255) / 255,
      props.color[1],
      props.color[2],
      1.,
    ],
  },

  count: 3,
});


const drawFrame = () => {
  regl.clear({
    depth: 1,
    color: [0., 0., Math.random(), 1.],
  });

  drawTriangle(regl)({
    color: [.8, .2, .3, 1.],
  });
};


const init = () => {
  regl = createREGL();
  regl.frame(drawFrame);
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
