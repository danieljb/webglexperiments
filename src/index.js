
import createREGL from 'regl';

import FragmentShader from './main.frag';
import VertexShader from './main.vert';


let regl;
let mouse = { x: 0, y: 0 };


const drawTriangle = (regl) => regl({
  frag: FragmentShader,
  vert: VertexShader,

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
    mouse: () => [mouse.x, mouse.y],
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


const updateMousePosition = (event) => {
  const { x, y } = event;
  mouse = { x, y };
};


const init = () => {
  regl = createREGL();
  regl.frame(drawFrame);

  document.addEventListener('mousemove', updateMousePosition);
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
